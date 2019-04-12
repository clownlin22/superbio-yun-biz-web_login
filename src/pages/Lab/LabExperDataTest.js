import React, { PureComponent, Fragment } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Modal,
  message,
  Table,
  InputNumber,
  DatePicker,
} from 'antd';
import StandardTable from '@/components/StandardTable/datas';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './LabExperDataTest.less';
import { connect } from 'dva';

const FormItem = Form.Item;
const { Option } = Select;
const experimental = ['未上传', '已上传', '部分上传'];
const experResult = ['肯定', '否定', '需加位点', '检测不出结果'];
const confState = ['已确认', '待确认'];

@connect(({ experdatatest, loading }) => ({
  experdatatest,
  loading: loading.models.exper,
}))
@Form.create()
class LabExperDataTest extends PureComponent {

  state = {
    expandForm: false,
    formValues: {},
    selectedRows: [],
  };

  columns = [
    {
      title: '实验编号',
      dataIndex: 'id',
      align: 'center',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.showModal()}>{record.id}</a>
        </Fragment>
      ),
    },
    {
      title: '案例编号',
      dataIndex: 'case_number',
      align: 'center',
    },
    {
      title: '委托人',
      dataIndex: 'client',
      align: 'center',
    },
    {
      title: '实验数据',
      dataIndex: 'experimental',
      align: 'center',
      render(val) {
        const experiment = `${experimental[val]}`;
        return experiment;
      },
    },
    {
      title: '实验结果',
      dataIndex: 'experResult',
      align: 'center',
      render(val) {
        const conf = `${experResult[val]}`;
        return conf;
      },
      // render: val => `${val} `,
    },
    {
      title: '确认状态',
      dataIndex: 'confState',
      align: 'center',
      render(val) {
        const conf = `${confState[val]}`;
        return conf;
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'experdatatest/query',
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="实验编号">
              {getFieldDecorator('id')(<Input placeholder="请输入实验编号"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="案例编号">
              {getFieldDecorator('case_number')(<Input placeholder="请输入案例编号"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down"/>
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="实验编号">
              {getFieldDecorator('id')(<Input placeholder="请输入实验编号"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="案例编号">
              {getFieldDecorator('case_number')(<Input placeholder="请输入案例编号"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="&nbsp;&nbsp;&nbsp;委托人">
              {getFieldDecorator('client')(<Input placeholder="请输入委托人"/>)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="实验数据">
              {getFieldDecorator('experimental')(
                <Select allowClear placeholder="请选择" style={{ width: '10,100%' }}>
                  <Option value="0">未上传</Option>
                  <Option value="1">已上传</Option>
                  <Option value="2">部分上传</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="实验结果">
              {getFieldDecorator('experResult')(
                <Select allowClear placeholder="请选择" style={{ width: '10,100%' }}>
                  <Option value="0">肯定</Option>
                  <Option value="1">否定</Option>
                  <Option value="2">需加位点</Option>
                  <Option value="3">检测不出结果</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="确认状态">
              {getFieldDecorator('confState')(
                <Select allowClear placeholder="请选择" style={{ width: '10,100%' }}>
                  <Option value="0">已确认</Option>
                  <Option value="1">待确认</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up"/>
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { selectedRows, visible, confirmLoading } = this.state;
    const {
      experdatatest: { data },
      loading,
    } = this.props;
    const columns = [];
    const dataSource = [];
    columns.push(
      {
        title: '基因位点',
        className: 'Allele',
        dataIndex: 'Allele',
        key: 'Allele',
        width: 150,
      },
      {
        title: '父亲',
        dataIndex: 'Commentf',
        className: 'Commentf',
        key: 'Commentf',
        width: 150,
      },
      {
        title: '孩子',
        dataIndex: 'Comments',
        className: 'Comments',
        key: 'Comments',
        width: 150,
      },
    );
    return (
      <PageHeaderWrapper title="实验数据测试">
        <Card bordered={false}>
          <div>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div>
              <span>
                  <Button onClick={this.showModal}
                          disabled={selectedRows.length === 0 || selectedRows.length > 1}>查看实验数据</Button>
                  <Button disabled={selectedRows.length === 0}>确认否定结果</Button>
                  <Button type="danger" disabled={selectedRows.length === 0}>删除实验数据</Button>
              </span>
              <Modal
                width="50%"
                title="查看数据"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
              >
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  bordered
                  align="center"
                  pagination={false}
                  scroll={{ y: 350 }}
                  showHeader
                />
                ,
              </Modal>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              data={data}
              loading={loading}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default LabExperDataTest;
