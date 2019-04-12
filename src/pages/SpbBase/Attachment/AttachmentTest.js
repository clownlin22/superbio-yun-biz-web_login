import React, { PureComponent, Fragment } from 'react';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import {
  Form,
  Card,
  Row,
  Col,
  Select,
  Button,
  Icon,
  Tooltip,
  Divider,
  Upload,
  message,
  Modal,
  Input,
  Switch,
} from 'antd';
import stylesAttachment from './Attachment.less';
import styles from '../../Finance/CaseReview.less';

const FormItem = Form.Item;
const confirms = Modal.confirm;

@Form.create()
class SearchForm extends PureComponent {
  renderSearchForm(){
    const {
      form: { getFieldDecorator },
      bizType,
    } = this.props;
    return (
      <Form layout="inline" className={styles.tableListForm}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="业务类型">
              {getFieldDecorator('bizType')(
                <Select placeholder="请选择业务类型" allowClear>
                  {bizType.map(item => (
                    <Select.Option key={item.dataIndex}>{item.title}</Select.Option>
                  ))}
                </Select>)}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <FormItem label="业务主键">
              {getFieldDecorator('bizId')(
                <Input placeholder="请输入业务主键" />,
              )}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <FormItem label="启用状态">
              {getFieldDecorator('enabled')(
                <Select placeholder="请选择" allowClear>
                  <Select.Option value={0}>禁用</Select.Option>
                  <Select.Option value={1}>启用</Select.Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="文件名称">
              {getFieldDecorator('fileName')(
                <Input placeholder="请输入文件名称（包括扩展名）" />,
              )}
            </FormItem>
          </Col>

          <Col md={16} sm={24}>
            <span className={styles.submitButtons} style={{ float: 'right' }}>
              <Button type="primary" onClick={this.handleSearch}>
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

  render() {
    return (
      <div>{this.renderSearchForm()}</div>
    );
  }
}

@Form.create()
class AttachmentTest extends PureComponent {

  handleFormReset = () => {
    this.setState({
      formValues: {},
    });
  };

  render() {

    const SearchMethods = {
      handleSearch: this.handleSearch,
      handleFormReset: this.handleFormReset,
    };

    return (
      <PageHeaderWrapper title="文件管理">
        <Card bordered={false}>
          <SearchForm
            {...SearchMethods}
          />

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AttachmentTest;
