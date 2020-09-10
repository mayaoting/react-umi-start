import React, { useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Steps, Card } from 'antd';
import style from './index.less';

const { Step } = Steps;
export interface StepFormProps {
  current?: string;
}

const getCurrentStepAndComponent = (current?: string) => {
  switch (current) {
    case 'confirm':
      return { step: 1, component: 1 };
  }
};

const StepForm: React.FC<StepFormProps> = ({ current = 1 }) => {
  return (
    <PageHeaderWrapper content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。">
      <Card bordered={false}>
        <>
          <Steps current={1} className={style.steps}>
            <Step title="填写转账信息" />
            <Step title="确认转账信息" />
            <Step title="完成" />
          </Steps>
          {current}
        </>
      </Card>
    </PageHeaderWrapper>
  );
};

export default StepForm;
