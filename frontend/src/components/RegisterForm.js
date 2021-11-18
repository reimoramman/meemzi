import { Form, Input, Button, Layout } from 'antd'
import {UserAddOutlined} from '@ant-design/icons'

function RegisterForm() {

    const [form] = Form.useForm()
    const onFinish = (values) => {

        if(values.password === values.confirmPassword){
            //console.log('Success:', values)
            try{
                fetch('http://localhost:8081/api/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {'Content-Type':'application/json'}
                }).then(data => isAccepted(data))

            }catch (error){
                console.error(error)
            }
            form.resetFields()
        } else {
            alert("Given passwords do not match!")
        }
    }

    function isAccepted(data) {
        if(data.hasOwnProperty('error')){
            //console.log("Error registering!")
            alert("Error registering")
        } else{
            alert("Registration succeeded")
        }
    }

    return (
        <Layout className="container" type="flex" justify="center" align="middle">
            <Form form={form} labelCol={{span: 8}} wrapperCol={{span: 8}} initialValues={{remember: true,}}
                  labelAlign="center" name="register" onFinish={onFinish} onFailed={onFailed}>

                <Form.Item label="E-mail" name="email" rules={[{required: true, },]}>
                    <Input placeholder="example@email.com" type="email" required></Input>
                </Form.Item>

                <Form.Item label="First name" name="firstName" rules={[{required: true, },]}>
                    <Input required placeholder="First Name" rules={[{required: true, },]}></Input>
                </Form.Item>

                <Form.Item label="Last name" name="lastName" rules={[{required: true, },]}>
                    <Input required placeholder="Last Name"></Input>
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{required: true, },]}>
                    <Input type="password" placeholder="secret ;)" required></Input>
                </Form.Item>

                <Form.Item label="Confirm password" name="confirmPassword" rules={[{required: true, },]}>
                    <Input type="password" placeholder="secret ;)" required></Input>
                </Form.Item>

                <Form.Item style={{display: "flex", flexDirection: "center", justifyContent:"center" }}>
                    <Button type="primary" htmlType="submit"><UserAddOutlined/>Register</Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}

export default RegisterForm