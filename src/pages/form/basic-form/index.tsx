import React, { FC, Dispatch } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  DatePicker,
  Input,
  Form,
  InputNumber,
  Radio,
  Select,
  Tooltip,
} from 'antd';
import styles from './style.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
export interface BasicFormProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

// 函数式组件类型可以使用 React.FC 必须返回一个 ReactNode
const BasicForm: FC<BasicFormProps> = props => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };
  const onFinish = (values: { [key: string]: any }) => {};
  const onFinishFaild = (errorInfo: any) => {
    console.log('Failed', errorInfo);
  };
  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    if (publicType) {
      setShowPublicUsers(publicType === '2');
    }
  };
  return (
    <PageHeaderWrapper
      title={'基础表单'}
      content={
        '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。'
      }
    >
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFaild}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label={'标题'}
            name="title"
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
          >
            <Input placeholder={'please input title'} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={'起止日期'}
            name="date"
            rules={[
              {
                required: true,
                message: '请选择起止日期',
              },
            ]}
          >
            <RangePicker
              style={{ width: '100%' }}
              placeholder={['开始日期', '结束日期']}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="目标描述"
            name="goal"
            rules={[
              {
                required: true,
                message: '请输入目标描述',
              },
            ]}
          >
            <TextArea
              style={{ minHeight: 32 }}
              placeholder={'please input you stage goal'}
              rows={4}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="衡量标准"
            name="standard"
            rules={[
              {
                required: true,
                message: '请输入衡量标准',
              },
            ]}
          >
            <TextArea
              style={{ minHeight: 32 }}
              placeholder={'please input you stage goal'}
              rows={4}
            />
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default BasicForm;