import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Table, Card, Button, Row, Col, Select, Input, Modal, TreeSelect } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Authcenter.less';

const confirms = Modal.confirm;
const FormItem = Form.Item;
const { Option } = Select;

const treeLeafStatus = ['有', '无'];

/* 装饰器加载 */
/* eslint react/no-multi-comp:0 */
@connect(({ departMent, loading }) => ({
  departMent,
  loading: loading.models.departMent,
}))
@Form.create()
class Privilege extends PureComponent {
  state = {
    selectRow: {},
    selectedRows: [],
    // formValues:{},
    areaModalVisible: false,
    action: '',
    treeNames: '',
    type: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'departMent/fetch',
    });
  }

  areaModal = data => {
    const { areaModalVisible, selectRow, action, treeNames, type } = this.state;
    const { form } = this.props;
    /* const {
       form: { getFieldDecorator },
     } = this.props;
 */
    return (
      <Modal
        title={`${action}信息`}
        visible={areaModalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="部门名称">
          {form.getFieldDecorator('name', {
            rules: [{ required: false, message: '请选择部门名称！' }],
            initialValue: selectRow.name,
          })(<Input placeholder="请输入部门名称" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="上级部门">
          {form.getFieldDecorator('parentId', {
            initialValue:
              action === '添加下级' || action === '修改' ? treeNames : selectRow.treeNames,
          })(
            <TreeSelect
              style={{ width: 300 }}
              // value={this.state.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={this.buildTree(JSON.stringify(data))}
              placeholder="请选择上级部门"
            />
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="部门类型">
          {form.getFieldDecorator('type', {
            rules: [{ required: false, message: '请选择部门类型！' }],
            initialValue: action === '部门类型' ? type : selectRow.type,
          })(
            <Select placeholder="请选择部门类型" style={{ width: '100%' }}>
              <Option value="1">最上级部门</Option>
              <Option value="2">二级部门</Option>
              <Option value="3">三级部门</Option>
            </Select>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序号">
          {form.getFieldDecorator('treeSort', {
            rules: [{ required: false, message: '请输入排序号！' }],
            initialValue: action === '排序号' ? type : selectRow.treeSort,
          })(<Input placeholder="请输入排序号" />)}
        </FormItem>
      </Modal>
    );
  };

  showAreaModal = (e, act) => {
    const { selectedRows } = this.state;
    const firstRow = selectedRows[0];
    this.setState({
      areaModalVisible: true,
    });

    if (act === '修改') {
      this.setState({
        action: act,
        treeNames:
          selectedRows[0].treeNames === ''
            ? selectedRows[0].parentIdString
            : `${selectedRows[0].parentIdString}`,
        selectRow: firstRow,
      });
    }
    if (act === '添加下级') {
      this.setState({
        treeNames:
          selectedRows[0].treeNames === '' ? selectedRows[0].name : `${selectedRows[0].name}`,
        action: act,
      });
    }
    if (act === '新增部门') {
      this.setState({
        action: act,
        selectRow: {},
      });
    }
  };

  handleOk = () => {
    const { dispatch, form } = this.props;
    const { action } = this.state;
    const { selectedRows } = this.state;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const self = this;
      let values = '';
      if (action === '修改') {
        values = {
          ...fieldsValue,
          id: selectedRows[0].idString,
        };
        dispatch({
          type: 'departMent/update',
          payload: values,
        });
        self.handleFormReset();
      }
      if (action === '添加下级') {
        values = {
          ...fieldsValue,
        };
        dispatch({
          type: 'departMent/add',
          payload: values,
        });
        self.handleFormReset();
      }
      if (action === '新增部门') {
        values = {
          ...fieldsValue,
        };
        dispatch({
          type: 'departMent/add',
          payload: values,
        });
        self.handleFormReset();
      }
    });
    form.resetFields();
    this.setState({
      selectRow: {},
      areaModalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      areaModalVisible: false,
      selectRow: {},
    });
  };

  remove = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    const self = this;
    confirms({
      title: '确定删除该区域及子区域?',
      onOk() {
        // const id = selectedRows.map(item=>item.id);
        dispatch({
          type: 'departMent/remove',
          // payload:id
          payload: {
            key: selectedRows.map(row => row.key),
          },
        });
        self.handleForm();
      },
      onCancel() {},
    });
  };

  buildTree = data => {
    const temp1 = JSON.parse(data);
    const temp = {};
    const tree = [];
    for (const i in temp1) {
      temp1[i].key = temp1[i].id;
      temp1[i].value = temp1[i].id;
      temp1[i].title = temp1[i].name;
      temp[temp1[i].id] = temp1[i];
    }
    for (const i in temp) {
      if (temp[i].parentId) {
        if (!temp[temp[i].parentId].children) {
          temp[temp[i].parentId].children = new Array();
        }
        temp[temp[i].parentId].children.push(temp[i]);
      } else {
        tree.push(temp[i]);
      }
    }
    return tree;
  };

  onExpand = (expanded, record) => {
    const { dispatch } = this.props;
    if (expanded && record.children.length === 0) {
      dispatch({
        // type: "exce/selectDistrictChilendByCode",
        payload: record.code,
      });
    }
  };

  handleSearch = e => {
    e.preventDefault();
    this.handleForm();
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    dispatch({
      type: 'departMent/fetch',
      payload: {},
    });
  };

  handleForm = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      dispatch({
        type: 'departMent/fetch',
        payload: values,
      });
    });
  };

  /* 查询条件 */
  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="部门名称">
              {getFieldDecorator('name')(<Input placeholder="请输入部门名称" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="部门类型">
              {getFieldDecorator('type')(
                <Select allowClear placeholder="请选择部门类型" style={{ width: '100%' }}>
                  <Option value="1">最上级部门</Option>
                  <Option value="2">二级部门</Option>
                  <Option value="3">三级部门</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderAdvancedForm();
  }

  render() {
    const {
      departMent: { data },
    } = this.props;

    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '排序号',
        dataIndex: 'treeSort',
        key: 'treeSort',
      },
      {
        title: '部门类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '有无上级部门',
        dataIndex: 'treeLeaf',
        key: 'treeLeaf',
        render(val) {
          const treeLeaf = `${treeLeafStatus[val]}`;
          return treeLeaf;
        },
      },
    ];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRows,
        });
      },
    };
    const { selectedRows } = this.state;
    return (
      <PageHeaderWrapper title="部门管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              {/*  按钮  */}
              <Button
                disabled={selectedRows.length === 1 && selectedRows[0].treeLeaf === 1}
                type="primary"
                onClick={e =>
                  this.showAreaModal(e, selectedRows.length === 1 ? '添加下级' : '新增部门')
                }
              >
                {selectedRows.length === 1 ? '添加下级' : '新增'}
              </Button>
              <Button
                disabled={selectedRows.length !== 1}
                onClick={e => this.showAreaModal(e, '修改')}
              >
                修改
              </Button>
              <Button type="danger" disabled={!(selectedRows.length > 0)} onClick={this.remove}>
                删除
              </Button>
              <div>{this.areaModal(data)}</div>
              {/*  查看数据的弹窗  */}
            </div>
            {/* 初始数据和 */}
            <Table
              rowKey="id"
              onExpand={(expanded, record) => this.onExpand(expanded, record)}
              dataSource={this.buildTree(JSON.stringify(data))}
              columns={columns}
              rowSelection={rowSelection}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Privilege;
