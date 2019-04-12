import React, { Component, Fragment } from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { connect } from 'dva';
import { Button, Icon, Row, Col, Steps, Card, Popover, Table } from 'antd';
import moment from 'moment';
import classNames from 'classnames';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AdvancedProfile.less';

const { Step } = Steps;
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => window.innerWidth || document.documentElement.clientWidth;
const categorys = ['亲子鉴定','文书鉴定','酒精鉴定','车辆痕迹鉴定','法医临床鉴定','法医病理鉴定'];
const cateStatus = ['已登记', '待审核 ', '审核不通过', '审核通过','样本交接确认','样本交接退回','实验中', '报告打印中', '报告确认','邮寄中','已归档','已签发', '签发成功'];
const Sector = ['个人','单位'];
const right = ['是','否'];
const report = ['邮寄','自取','送达'];
// 自取方式
const certTypes = ['凭合同副本','票据','身份证'];
// 被鉴定对象——车
const Citype = [{
  key: '0',
  id: '0',
  experState: '小型汽车',
},{
  key: '1',
  id: '1',
  experState: '货车/特种车辆/大型汽车',
},{
  key: '2',
  id: '2',
  experState: '电动车',
},{
  key: '3',
  id: '3',
  experState: '摩托车',
},{
  key: '4',
  id: '4',
  experState: '自行车',
},{
  key: '5',
  id: '5',
  experState: '其他',
}];
// 鉴定材料
const MateType = [
  {
    key: '1',
    id: '1',
    experState: '资料',
  },
  {
    key: '2',
    id: '2',
    experState: '样本',
  },
  {
    key: '3',
    id: '3',
    experState: '验材',
  },
];
const Properties = [
  {
    key: '1',
    id: '1',
    experState: '原件',
  },
  {
    key: '2',
    id: '2',
    experState: '复印件',
  },
  {
    key: '3',
    id: '3',
    experState: '电子件',
  },
];
const Specification = [
  {
    key: '1',
    id: '1',
    experState: '份',
  },
  {
    key: '2',
    id: '2',
    experState: '页',
  },
  {
    key: '3',
    id: '3',
    experState: '个',
  },
  {
    key: '4',
    id: '4',
    experState: '张',
  },
  {
    key: '5',
    id: '5',
    experState: 'ml',
  },
  {
    key: '6',
    id: '6',
    experState: '支',
  },
  {
    key: '7',
    id: '7',
    experState: '具',
  },
];
// 收费
const Chargetype = [
  {
    key: '0',
    id: '0',
    experState: '全部',
  },
  {
    key: '1',
    id: '1',
    experState: '鉴定费',
  },
  {
    key: '2',
    id: '2',
    experState: '附加费',
  },
  {
    key: '3',
    id: '3',
    experState: '会诊费',
  },
  {
    key: '4',
    id: '4',
    experState: '现勘费',
  },
  {
    key: '5',
    id: '5',
    experState: '出庭费',
  },
  {
    key: '6',
    id: '6',
    experState: '服务费',
  },
  {
    key: '7',
    id: '7',
    experState: '加急费',
  }
];
// 详情
const tabList = [
  {
    key: 'detail',
    tab: '详情',
  },
];

const customDot = (dot, { status }) =>
  status === 'process' ? (
    <Popover placement="topLeft" arrowPointAtCenter>
      {dot}
    </Popover>
  ) : (
    dot
  );
// 委托事项
const operationTabList = [
  {
    key: 'tab1',
    tab: '委托事项',
  },
];
// 鉴定材料
const operationTabList3 = [
  {
    key: 'tab3',
    tab: '鉴定材料',
  },
];
// 收费说明
const operationTabList4 = [
  {
    key: 'tab6',
    tab: '收费说明',
  },
];

@connect(({ casedemo,caseform, loading }) => ({
  casedemo,caseform,
  loading: loading.models.casedemo,
}))
class AdvancedProfile extends Component {
  // 初始状态
  state = {
    // 委托事项
    operationkey: 'tab1',
    // 被鉴定对象（人）
    operationkey2: 'tab2',
    // 鉴定材料
    operationkey3: 'tab3',
    // 收费
    operationkey4: 'tab6',
    stepDirection: 'vertical',
  };

  // 初始查询
  componentDidMount() {
    const { dispatch
    } = this.props;
    const self = this;
    // dispatch({
    //   type: 'casedemo/caseGetId',
    //   payload:self.props.location.state.id
    // });
    dispatch({
      type: 'caseform/fetchEntrust',
    });
    dispatch({
      type: 'caseform/queryCharging',
    });
    new Promise((resolve, reject) => {
      dispatch({
        type: 'caseform/caseGetId',
        payload: {
          ids:self.props.location.state.id,
          resolve,
          reject
        },
      })
    }).then((attachMentData) => {
      if (attachMentData.caseMaterial.length>0) {
        const ids = [];
        for(let i=0;i<attachMentData.caseMaterial.length;i+=1){
          ids.push(attachMentData.caseMaterial[i].attachmentId);
        }
        if (ids.length>0) {
          dispatch({
            type: 'caseform/fetchAttachMent',
            payload: ids
          });
        }
      }
    });
    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection, { passive: true });
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.setStepDirection);
    // this.setStepDirection.cancel();
  }

  // 委托事项状态
  onOperationTabChange = key => {
    this.setState({ operationkey: key });
  };

  // 鉴定对象状态
  onOperationTabChange2 = key => {
    this.setState({ operationkey2: key });
  };

  // 鉴定材料状态
  onOperationTabChange3 = key => {
    this.setState({ operationkey3: key });
  };

  // 收费状态
  onOperationTabChange4 = key => {
    this.setState({ operationkey4: key });
  };

  @Bind()
  @Debounce(200)
  // 状态的展示
  setStepDirection() {
    const { stepDirection } = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 100) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 100) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    // operationkey 委托事项 operationkey2 鉴定对象 operationkey3 鉴定材料 operationkey4 收费
    const { stepDirection, operationkey, operationkey2, operationkey3, operationkey4 } = this.state;
    const { loading, caseform:{dataEntrust,caseGetIds,dataCharging,attachmentList}
    } = this.props;
    // 委托事项
    const columns = [
      {
        title: '委托事项',
        dataIndex: 'entrustedMatterId',
        key: 'entrustedMatterId',
        render: (text) => {
          if(dataEntrust.list!==undefined){
            const name = dataEntrust.list.filter(item => parseInt(item.id, 10) === parseInt(text, 10));
            return name.length > 0 ? name[0].entrustName : text;
          }
          return text;
        },
      },
      {
        title: '细项',
        dataIndex: 'detail',
        key: 'detail',
        render: (text, record) => {
          if(dataEntrust.list!==undefined){
            const name = dataEntrust.list.filter(item => parseInt(item.id, 10) === parseInt(record.entrustedMatterId, 10));
            return name.length > 0 ? name[0].detail : text;
          }
          return text;
        },
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
    ];
    // 人
    const columnss = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '身份证号',
        dataIndex: 'idNumber',
        key: 'idNumber',
      },
      {
        title: '民族',
        dataIndex: 'nation',
        key: 'nation',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render (text){
          return parseInt(text,10) === parseInt(0,10) ? '男' : '女';
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '家庭住址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '联系人',
        dataIndex: 'contactName',
        key: 'contactName',
      },
      {
        title: '联系电话',
        dataIndex: 'contactPhone',
        key: 'contactPhone',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
    ];
    // 物
    const columnssw = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '联系人',
        dataIndex: 'contactName',
        key: 'contactName',
      },
      {
        title: '联系电话',
        dataIndex: 'contactPhone',
        key: 'contactPhone',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
    ];
    // 车
    const columnssc = [
      {
        title: '车牌号',
        dataIndex: 'plateName',
        key: 'plateName',
      },
      {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand',
      },
      {
        title: '车辆类型',
        dataIndex: 'type',
        key: 'type',
        render: (text) => {
          const name = Citype.filter(item => parseInt(item.id, 10) === parseInt(text, 10));
          return name.length > 0 ? name[0].experState : text;
        },
      },
      {
        title: '车架号',
        dataIndex: 'vin',
        key: 'vin',
      },
      {
        title: '发动机号',
        dataIndex: 'engineNumber',
        key: 'engineNumber',
      },
      {
        title: '停放地点',
        dataIndex: 'parkingPlace',
        key: 'parkingPlace',
      },
      {
        title: '联系人',
        dataIndex: 'contactName',
        key: 'contactName',
      },
      {
        title: '联系电话',
        dataIndex: 'contactPhone',
        key: 'contactPhone',
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
    ];
    // 鉴定材料
    const columnsss = [
      {
        title: '材料名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text) => {
          const name = MateType.filter(item => parseInt(item.id, 10) === parseInt(text, 10));
          return name.length > 0 ? name[0].experState : text;
        },
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '规格',
        dataIndex: 'specification',
        key: 'specification',
      render: (text) => {
        const name = Specification.filter(item => parseInt(item.id, 10) === parseInt(text, 10));
        return name.length > 0 ? name[0].experState : text;
    },
      },
      {
        title: '材料性质',
        dataIndex: 'feature',
        key: 'feature',
        render: (text) => {
          const name = Properties.filter(item => parseInt(item.id, 10) === parseInt(text, 10));
          return name.length > 0 ? name[0].experState : text;
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      },
      {
        title: '文件',
        dataIndex: 'attachmentId',
        key: 'attachmentId',
        render: (text)=> {
          if(attachmentList!==undefined){
            const name = attachmentList.filter(item=>item.id===text);
            return name.length>0?name[0].fileName : text;
          }
          return text;
        },
      },
    ];
    // 收费说明
    const column = [
      {
        title: '收费项目',
        dataIndex: 'chargingItemId',
        key: 'chargingItemId',
        render: (text) => {
          if(dataCharging.list!==undefined){
            const name = dataCharging.list.filter(item=>parseInt(item.id,10)===parseInt(text,10));
            return name.length>0?name[0].projectName : text;
          }
          return text;
        },
      },
      {
        title: '收费类别',
        dataIndex: 'refundType',
        key: 'refundType',
        render: (text, record) => {
          if(dataCharging.list!==undefined){
            const chargingId = dataCharging.list.filter(item => parseInt(item.id, 10) === parseInt(record.chargingItemId, 10));
            const xperState = chargingId.length > 0 ? chargingId[0].refundType : text;
            const name = Chargetype.filter(item=>parseInt(item.id,10)===parseInt(xperState,10));
            return name.length>0?name[0].experState : text;
          }
          return text;
        },
      },
      {
        title: '单价',
        dataIndex: 'money',
        key: 'money',
        render: (text, record) => {
          if(dataCharging.list!==undefined){
            const name = dataCharging.list.filter(item => parseInt(item.id, 10) === parseInt(record.chargingItemId, 10));
            return name.length > 0 ? name[0].money : text;
          }
          return text;
        },
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: '优惠金额',
        dataIndex: 'discount',
        key: 'discount',
      },
      {
        title: '应收小计',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
      },
    ];
    const tabLists = [];
    // 被鉴定对象的判断
    if(caseGetIds!==undefined){
      if(caseGetIds.caseCategoryId !== undefined){
        const caseId = parseInt(caseGetIds.caseCategoryId,10);
        if(caseId === parseInt(0,10)||caseId === parseInt(2,10)||caseId === parseInt(3,10)||caseId === parseInt(4,10)||caseId === parseInt(5,10)){
          tabLists.push({
            key: 'tab2',
            tab: '被鉴定对象(人)',
          })
        }
        if(caseId === parseInt(3,10)||caseId === parseInt(5,10)){
          tabLists.push({
            key: 'tab4',
            tab: '被鉴定对象(车)',
          })
        }
        if(caseId === parseInt(1,10)||caseId === parseInt(5,10)){
          tabLists.push({
            key: 'tab5',
            tab: '被鉴定对象(物)',
          })
        }
      }
    }
    // 页眉左部数据
    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="委托人">{caseGetIds!==undefined?caseGetIds.clientName:''}</Description>
        <Description term="委托人电话">{caseGetIds!==undefined?caseGetIds.clientPhone:''}</Description>
        <Description term="是否回避">{caseGetIds!==undefined?right[caseGetIds.needEvade]:''}</Description>
        <Description term="是否加急">{caseGetIds!==undefined?right[caseGetIds.urgent]:''}</Description>
        <Description term="委托单位">{caseGetIds!==undefined?caseGetIds.clientDept:''}</Description>
        <Description term="联系人地址">{caseGetIds!==undefined?caseGetIds.clientAddress:''}</Description>
      </DescriptionList>
    );
    // 页眉右部数据
    const extra = (
      <Row>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>状态</div>
          <div className={styles.heading}>{caseGetIds!==undefined?cateStatus[caseGetIds.status]:''}</div>
        </Col>
        <Col xs={24} sm={12}>
          <div className={styles.textSecondary}>订单金额</div>
          <div className={styles.heading}>¥&nbsp; {caseGetIds!==undefined?caseGetIds.totalPrice:''}</div>
        </Col>
      </Row>
    );
    // 委托时间
    const entrust = caseGetIds!==undefined?caseGetIds.entrustDate:'';
    // 受理日期
    const accept =  caseGetIds!==undefined?caseGetIds.acceptDate:'';
    // 发放方式
    // 订单状态和状态的展示
    const reportType =caseGetIds!==undefined?caseGetIds.reportProvidedType:'';
    const status = caseGetIds!==undefined?caseGetIds.status:'';
    const rowStatus = parseInt(status,10);
    let rowNumber = 0;
    if(rowStatus===0||rowStatus===1||rowStatus===2){
      rowNumber = parseInt(0,10);
    }
    if(rowStatus>2&&rowStatus<7){
      rowNumber = parseInt(1,10);
    }
    if(rowStatus>6&&rowStatus<9){
      rowNumber = parseInt(2,10);
    }
    if(rowStatus===9){
      rowNumber = parseInt(3,10);
    }
    if(rowStatus>9){
      rowNumber = parseInt(4,10);
    }
    // 子页面的展示
    const contentList = {
      // 委托事项
      tab1: (
        <Table
          rowKey="id"
          pagination={false}
          loading={loading}
          dataSource={caseGetIds!==undefined?caseGetIds.identificationMatter:[]}
          columns={columns}
        />
      ),
      // 材料
      tab3: (
        <Table
          rowKey="id"
          pagination={false}
          loading={loading}
          dataSource={caseGetIds!==undefined?caseGetIds.caseMaterial:[]}
          columns={columnsss}
        />
      ),
      // 人
      tab2: (
        <Table
          rowKey="id"
          pagination={false}
          loading={loading}
          dataSource={caseGetIds!==undefined?caseGetIds.identifiedPerson:[]}
          columns={columnss}
        />
      ),
      // 车
      tab4: (
        <Table
          rowKey="id"
          pagination={false}
          loading={loading}
          dataSource={caseGetIds!==undefined?caseGetIds.identifiedCar:[]}
          columns={columnssc}
        />
      ),
      // 物
      tab5: (
        <Table
          rowKey="id"
          pagination={false}
          loading={loading}
          dataSource={caseGetIds!==undefined?caseGetIds.identifiedObject:[]}
          columns={columnssw}
        />
      ),
      // 收费
      tab6: (
        <Table
          rowKey="id"
          pagination={false}
          loading={loading}
          dataSource={caseGetIds!==undefined?caseGetIds.caseCharging:[]}
          columns={column}
        />
      ),
    };
    return (
      <PageHeaderWrapper
        title={`案例编号：${caseGetIds!==undefined?caseGetIds.caseNo:''}`}
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        content={description}
        extraContent={extra}
        tabList={tabList}
      >
        {/* 流程进度 */}
        <Card title="流程进度" style={{marginBottom: 24}} bordered={false}>
          <Steps direction={stepDirection} progressDot={customDot} current={rowNumber}>
            <Step title="案例登记" />
            <Step title="实验中" />
            <Step title="出报告" />
            <Step title="邮寄" />
            <Step title="完成" />
          </Steps>
        </Card>
        {/* 鉴定信息 */}
        <Card title="鉴定信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="案件编号">{caseGetIds!==undefined?caseGetIds.caseNo:''}</Description>
            <Description term="专业类别">{caseGetIds!==undefined?categorys[caseGetIds.caseCategoryId]:''}</Description>
            <Description term="案件标志">{caseGetIds!==undefined?caseGetIds.caseSign:''} {}</Description>
            <Description term="委托时间">{caseGetIds!==undefined?moment(entrust).format('YYYY-MM-DD'):''}</Description>
            <Description term="受理时间">{caseGetIds!==undefined?moment(accept).format('YYYY-MM-DD'):''}</Description>
            <Description term="落案时间">{caseGetIds!==undefined?caseGetIds.deadline:''} 个工作日</Description>
          </DescriptionList>
        </Card>
        {/* 委托信息 */}
        <Card title="委托信息" style={{ marginBottom: 24 }} bordered={false}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="委托人">{caseGetIds!==undefined?caseGetIds.clientName:''}</Description>
            <Description term="委托人电话">{caseGetIds!==undefined?caseGetIds.clientPhone:''}</Description>
            <Description term="委托单位">{caseGetIds!==undefined?caseGetIds.clientDept:'无'}</Description>
            <Description term="委托方类型">{caseGetIds!==undefined?Sector[caseGetIds.clientType]:''}</Description>
            <Description term="既往鉴定史">{caseGetIds!==undefined?right[caseGetIds.identifiedBefore]:''}</Description>
            <Description term="是否回避">{caseGetIds!==undefined?right[caseGetIds.needEvade]:''}</Description>
            <Description term="是否加急">{caseGetIds!==undefined?right[caseGetIds.urgent]:''}</Description>
            <Description term="材料齐全">{caseGetIds!==undefined?right[caseGetIds.materialsCompleted]:''}</Description>
            <Description term="联系人地址">{caseGetIds!==undefined?caseGetIds.clientAddress:''}</Description>
          </DescriptionList>

          {(() => {
            // 根据专业类别，展示检案摘要
            const caseId = caseGetIds !== undefined ? parseInt(caseGetIds.caseCategoryId,10) : '';
            switch (caseId) {
              case 0:
                return null;
              default:
                return (
                  <DescriptionList style={{marginBottom: 24}}>
                    <Description term="检案摘要">
                      {/* 据送检资料记载：委托方对送检的XXXX材料上的XXXXX签名/公章印文真实性存疑，故委托本机构协助查明其事实真相。 */}
                      {caseGetIds !== undefined ? caseGetIds.caseSummary : ''}
                    </Description>
                  </DescriptionList>
                );
            }
          })()}
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="备注">{caseGetIds!==undefined?caseGetIds.remark:''}</Description>
          </DescriptionList>
        </Card>
        {/* 报告回寄地址 */}
        <Card title="报告回寄地址" style={{marginBottom: 24}} bordered={false}>
          <DescriptionList style={{marginBottom: 24}}>
            {/* 需要根据发放方式显示内容 */}
            <Description term="发放方式">{caseGetIds!==undefined?report[caseGetIds.reportProvidedType]:''}</Description>
          </DescriptionList>
          {(() => {
            switch (reportType) {
              case 0:
                return (
                  <DescriptionList style={{marginBottom: 24}}>
                    <Description term="收件人">{caseGetIds!==undefined?caseGetIds.recipientName:''}</Description>
                    <Description term="电话号码">{caseGetIds!==undefined?caseGetIds.recipientPhone:''}</Description>
                    <Description term="邮寄地址">{caseGetIds!==undefined?caseGetIds.recipientAddress:''}</Description>
                  </DescriptionList>
                );
              case 1:
                return (
                  <DescriptionList style={{marginBottom: 24}}>
                    <Description term="自取方式">{caseGetIds!==undefined?certTypes[caseGetIds.certTypeForTook]:''}</Description>
                    {(() => {
                      const certTypeFor = caseGetIds!==undefined?caseGetIds.certTypeForTook:'';
                      switch (certTypeFor) {
                        case 2:
                          return (
                            <DescriptionList style={{marginBottom: 24}}>
                              <Description term="身份证号">{caseGetIds!==undefined?caseGetIds.certIdentify:''}</Description>
                            </DescriptionList>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </DescriptionList>

              )
                ;
              case 2:
                return (
                  <DescriptionList style={{ marginBottom: 24 }}>
                    <Description term="收件人">{caseGetIds!==undefined?caseGetIds.recipientName:''}</Description>
                    <Description term="电话号码">{caseGetIds!==undefined?caseGetIds.recipientPhone:''}</Description>
                    <Description term="邮寄地址">{caseGetIds!==undefined?caseGetIds.recipientAddress:''}</Description>
                  </DescriptionList>
                );
              default:
                return null;
            }
          })()}
        </Card>

        {/* 委托事项 */}
        <Card
          style={{ marginBottom: 24 }}
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[operationkey]}
        </Card>
        {/* 鉴定对象 */}
        <Card
          style={{ marginBottom: 24 }}
          className={styles.tabsCard}
          bordered={false}
          tabList={tabLists}
          onTabChange={this.onOperationTabChange2}
        >
          {contentList[operationkey2]}
        </Card>
        {/* 鉴定材料 */}
        <Card
          style={{ marginBottom: 24 }}
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList3}
          onTabChange={this.onOperationTabChange3}
        >
          {contentList[operationkey3]}
        </Card>
        {/* 收费 */}
        <Card
          style={{ marginBottom: 24 }}
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList4}
          onTabChange={this.onOperationTabChange4}
        >
          {contentList[operationkey4]}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AdvancedProfile;
