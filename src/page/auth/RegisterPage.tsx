import { useMutation } from '@tanstack/react-query';
import { Button, Checkbox, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../common/service/authService';
import { Controller, useForm } from 'react-hook-form';
import { RegisterFormData, registerSchema } from '../../common/schemas/authSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { RoleEnum } from '../../common/types';

const RegisterPage = () => {

  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      message.success("dnag ki thanh cong")
      navigate("/login")
    },
    onError: (err: any) => {
      message.error(err?.message || " Dang ki that bai . vui long thu lai sau")
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullname: "",
    }
  })

  const onSubmit = (data: RegisterFormData) => {
    mutate({
      role: RoleEnum.STUDENT,
      email: data.email,
      password: data.password,
      fullname: data.fullname
    })
  }

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }} 
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"

        onFinish={handleSubmit(onSubmit)}
      >
        {/* Fullname */}
        <Form.Item
          label="Họ và tên"
          validateStatus={errors.fullname ? "error" : ""}
          help={errors.fullname?.message}
        >
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Nhập họ và tên" />
            )}
          />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Nhập email" />
            )}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Mật khẩu"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Nhập mật khẩu" />
            )}
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          label="Xác nhận mật khẩu"
          validateStatus={errors.confirmPassword ? "error" : ""}
          help={errors.confirmPassword?.message}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Nhập lại mật khẩu" />
            )}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={isPending} block>
            {isPending ? "Đang xử lý..." : "Đăng ký"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterPage
