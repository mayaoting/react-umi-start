import React, { useRef } from 'react';
import {SearchOutlined } from '@ant-design/icons'
import { Input, AutoComplete } from 'antd';
import useMergeValue from 'use-merge-value';
// import classNames from 'classnames';
import styles from './index.less';
<SearchOutlined />

const HeaderSearch = props => {
  const {
    className,
    defaultValue,
    onVisibleChange,
    placeholder,
    open,
    defaultOpen,
    ...restProps
  } = props;
  const inputRef = useRef(null);
  const [value,setValue] = useMergeValue(defaultValue, {
    value: props.value,
    onChange:props.onChange,
  });
  const [searchMode, setSearchMode] = useMergeValue(defaultOpen || false, {
    value: props.open,
    onChange: onVisibleChange,
  });
  return (
    <div className={`${className} ${styles.headerSearch}`} 
      onClick={() => {
        setSearchMode(true)
        if(searchMode && inputRef.current) {
          inputRef.current.focus();
        }
      }}
      onTransitionEnd={({propertyName}) => {
        if(propertyName === 'width' && !searchMode) {
          if(onVisibleChange) {
            onVisibleChange(searchMode)
          }
        }
      }}
    >
     <SearchOutlined
        key="Icon"
        style={{cursor: 'pointer'}}
      /> 
      <AutoComplete
        key="AutoComplete"
        className={`${styles.input} ${searchMode ? styles.show : ''}`}
        value={value}
        style={{
          height:28,
          marginTop: -6,
        }}
        options={restProps.options}
        onChange={setValue}
      >
        <Input
          ref={inputRef}
          defaultValue={defaultValue}
          aria-label={placeholder}
          placeholder={placeholder}
          onKeyDown={e => {
            if(e.key === "Enter") {
              if(restProps.onSearch) {
                restProps.onSearch(value);
              }
            }
          }}
          onBlur={() => {
            setSearchMode(false)
          }}
        />

      </AutoComplete>
    </div>
  )
}

export default HeaderSearch;