import { classNames } from 'primereact/utils'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const Form = ({ children, onSubmit, initialValue }) => {
  const methods = useForm({ defaultValues: initialValue })
  const { handleSubmit } = methods
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          ...methods,
        })
      })}
    </form>
  )
}
export const Field = ({
  name = '',
  label = '',
  required = false,
  control,
  errors,
  defaultValues,
  children,
}) => {
  return (
    <div className='field-wrapper' style={{ display: 'inline-grid' }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValues}
        rules={required ? { required: `${label} is required.` } : {}}
        render={({ field, fieldState }) => {
          const isCheckbox =
            React.Children.only(children).type.displayName === 'Checkbox'
          return (
            <>
              <span className='p-float-label'>
                {isCheckbox
                  ? React.cloneElement(children, {
                      inputId: field.name,
                      checked: field.value,
                      onChange: (e) => field.onChange(e.checked),
                      className: classNames(children.props.className, {
                        'p-invalid': fieldState.error,
                      }),
                      inputRef: field.ref,
                    })
                  : React.cloneElement(children, {
                      ...field,
                      className: classNames(children.props.className, {
                        'p-invalid': fieldState.error,
                      }),
                    })}

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
