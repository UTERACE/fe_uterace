import { classNames } from 'primereact/utils'
import React, { cloneElement, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const Form = ({ children, onSubmit, initialValue, id }) => {
  const methods = useForm()
  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods
  useEffect(() => {
    for (var key in initialValue) {
      setValue(key, initialValue[key])
    }
  }, [initialValue])
  const childProps = {
    control: control,
    errors: errors,
    watch: watch,
  }

  const findAllElements = (children) => {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === Field) {
          child.props = { ...child.props, control: control, errors: errors }
        }
        if (child.props.children) {
          findAllElements(child.props.children)
        }
      }
    })
  }

  const addPropsToChildren = (children, childProps) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const newProps = { ...child.props, ...childProps }
        return cloneElement(
          child,
          newProps,
          addPropsToChildren(child.props.children, childProps)
        )
      }
      return child
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={id}>
      {addPropsToChildren(children, childProps)}
    </form>
  )
}
export const Field = (props) => {
  let {
    name = '',
    label = '',
    required = false,
    control,
    errors,
    pattern,
    defaultValues,
    watch,
    children,
  } = props
  const [_defaultValue, setDefaultValue] = useState()
  return (
    <div className='field-wrapper' style={{ display: 'inline-grid' }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValues}
        rules={
          required
            ? {
                required: `${label} không được để trống`,
                pattern: pattern && {
                  ...pattern,
                  value:
                    pattern?.value || new RegExp(`^${watch(pattern?.field)}$`),
                },
              }
            : {
                pattern: pattern && {
                  ...pattern,
                  value:
                    pattern?.value || new RegExp(`^${watch(pattern?.field)}$`),
                },
              }
        }
        render={({ field, fieldState }) => {
          let { onChange, setValue } = field

          const clonedChildren = React.Children.map(children, (child) => {
            let { onChange: childOnChange } = child.props
            let { setValue: childSetValue } = child.props
            return cloneElement(child, {
              ...field,
              onChange: (e) => {
                childOnChange && childOnChange(e)
                onChange(e)
              },
              setValue: (e) => {
                childSetValue && childSetValue(e)
                setValue(e)
              },
            })
          })
          return (
            <>
              <span className='p-float-label'>
                {clonedChildren}
                <label htmlFor={field.name} className='checkbox-label'>
                  {label}
                  {required && <span className='p-error'>*</span>}
                </label>
              </span>
              {errors && errors[name] && (
                <small className='p-error'>{errors[name].message}</small>
              )}
            </>
          )
        }}
      />
    </div>
  )
}
export default Form
