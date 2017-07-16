import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import styles from './Login.css';
import { login } from './actions';
import { Redirect } from 'react-router-dom';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(login(values));
      }
    })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const isLogged = this.props.isLogged;

    let referrer, location = this.props.location;
    if (location.state) {
      referrer = location.state.referrer;
    } else {
      referrer = '/console/overview';
    }

    return (
      isLogged ?
      <Redirect to={referrer} /> :
      (
        <div className={styles.login}>
          <Form onSubmit={this.handleSubmit} className={styles.form}>

            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名！' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                       placeholder="用户名"
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码！' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                       type="password"
                       placeholder="密码"
                />
              )}
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" className={styles.btnLogin}>
                登录
              </Button>
            </FormItem>

          </Form>
        </div>
      )
    );
  }
}


function mapStateToProps(state) {
  return {
    isLogged: state.auth.isLogged
  };
}

const Login = Form.create()(NormalLoginForm);
export default connect(mapStateToProps, null)(Login);
