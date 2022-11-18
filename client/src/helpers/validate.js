
export default function validate({ userName, password, email }) {
    let error = {};

    if (userName?.length <= 0) {
        error.userName = 'Tên người dùng không được bỏ trống';
    }

    if (password?.length <= 0) {
        error.password = 'Mật khẩu không được bỏ trống';
    }

    if (email?.length <= 0) {
        error.email = 'Email không được bỏ trống';
    }

    return error;
}