import React from 'react'
import { connect } from 'react-redux'
import { REDUCER, submit } from 'ducks/login'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

const mapStateToProps = (state, props) => ({
  isSubmitForm: state.app.submitForms[REDUCER],
})

@connect(mapStateToProps)
@Form.create()
class RegisterForm extends React.Component {
  static defaultProps = {}

  // $FlowFixMe
  onSubmit = (isSubmitForm: ?boolean) => event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    if (!isSubmitForm) {
      form.validateFields((error, values) => {
        if (!error) {
          dispatch(submit(values))
        }
      })
    }
  }

  render() {
    const { form, isSubmitForm } = this.props

    return (
      <div className="cat__pages__login__block__form">
        <h4 className="text-uppercase">
          <strong>Please register</strong>
        </h4>
        <br />
        <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit(isSubmitForm)}>
          <FormItem label="Name">
            {form.getFieldDecorator('username', {
              initialValue: 'ohmnislash',
              rules: [
                { required: true, message: 'Please input your full name' },
              ],
            })(<Input size="default" />)}
          </FormItem>
          <FormItem label="ID">
            {form.getFieldDecorator('password', {
              initialValue: '025111999',
              rules: [{ required: true, message: 'Please input your ID number' }],
            })(<Input size="default" type="text" />)}
          </FormItem>
          <div className="form-actions">
            <Button
              type="primary"
              className="width-100p mr-4"
              htmlType="submit"
              loading={isSubmitForm}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default RegisterForm
