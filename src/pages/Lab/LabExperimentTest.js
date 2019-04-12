import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  Button,
  Card, Col, DatePicker, Form, Input, Row,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import moment from 'moment';
import { connect } from 'dva';
import styles from './LabExperimentTest.less';


const FormItem = Form.Item;

@connect(({ expmenttest, loading }) => ({
  expmenttest,
  loading: loading.models.mana,
}))
@Form.create()
class LabExperimentTest extends PureComponent {

  state = {
    selectedRows: [],
    formValues: {},
  };
  columns = [
    {
      title: '实验编号',
      dataIndex: 'id',
      align:'center'
    },
    {
      title: '实验日期',
      dataIndex: 'ExperDate',
      align:'center',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'expmenttest/query',
    });
  }

  renderForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="实验编号">
              {getFieldDecorator('id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="实验日期">
              {getFieldDecorator('one')(
                <DatePicker
                  onChange={this.onChange}
                  style={{ width: '100%' }}
                  placeholder="请输入日期"
                />
              )}
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
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  render() {
    const {
      expmenttest: { data },
      loading,
    } = this.props;

    const { selectedRows, modalVisible } = this.state;

    return (
      <PageHeaderWrapper title="测试管理">
        <Card bordered={false}>
            <div>
              <div className={styles.tableListForm}>{this.renderForm()}</div>
              <div className={styles.tableListOperator}>
                <Button type="primary">
                  点击
                </Button>
              </div>
              <StandardTable
                selectedRows={selectedRows}
                data={data}
                columns={this.columns}
              />
            </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default LabExperimentTest;
