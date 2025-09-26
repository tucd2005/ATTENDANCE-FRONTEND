import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../common/service/authService';
import { Controller, useForm } from 'react-hook-form';
import { LoginFormData, loginSchema } from '../../common/schemas/authSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { RoleEnum } from '../../common/types';

const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data.data;

      message.success("Đăng nhập thành công");

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      switch (user.role) {
        case RoleEnum.SUPER_ADMIN:
          navigate("/super-admin/users");
          break;
        case RoleEnum.TEACHER:
          navigate("/teacher/attendances");
          break;
        case RoleEnum.STUDENT:
          navigate("/student/attendances");
          break;
        default:
          message.error("Vai trò không hợp lệ");
          navigate("/");
          break;
      }
    },
    onError: (err: any) => {
      message.error(err?.message || "Đăng nhập thất bại. Vui lòng thử lại sau");
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div>
      <Form
        name="login-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onFinish={handleSubmit(onSubmit)}
      >
        {/* Email */}
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Nhập email" />}
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
            render={({ field }) => <Input.Password {...field} placeholder="Nhập mật khẩu" />}
          />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" loading={isPending} block>
            {isPending ? "Đang xử lý..." : "Đăng nhập"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
