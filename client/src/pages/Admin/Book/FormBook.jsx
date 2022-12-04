
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

import bookService from '../../../services/bookService';
import { toast } from 'react-toastify';
import { toastConfig } from '../../../configs/toastConfig';
import authorService from '../../../services/authorService';
import categoryService from '../../../services/categoryService';
import publisherService from '../../../services/publisherService';

function FormBook({ type, book }) {
    const [ data, setData ] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        (async() => {
            const authorsArray = await authorService.getAllAuthors();
            const categoriesArray = await categoryService.getAllCategories();
            const publishersArray = await publisherService.getAllPublishers();
    
            setData({
                authors: authorsArray,
                categories: categoriesArray,
                publishers: publishersArray
            });
        })();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: type === 'detail' ? book.name : '',
            description: type === 'detail' ? book?.description : '',
            price: type === 'detail' ? book?.price : 0,
            author_id: type === 'detail' ? (book?.author?.id ? `${book?.author?.id}` : null) : null,
            category_id: type === 'detail' ? (book?.category?.id ? `${book?.category?.id}` : null) : null,
            publisher_id: type === 'detail' ? (book?.publisher?.id ? `${book?.publisher?.id}` : null) : null,
            image: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên không được bỏ trống!').max(40, 'Tên không được quá 40 ký tự'),
            price: Yup.number().min(0),
        }),
        onSubmit: function (values) {
            if (type === 'detail') {
                handleEditBook(book.id, values);
            } else {
                handleAddBook(values);            
            }
        }
    });

    function handleEditBook(id, body) {
        bookService.editBook(id, body)
        .then(() => {
            toast.success('Sửa thành công!', toastConfig);
            navigate('/admin/books');
        })
        .catch(error => {
            toast.error('Sửa thất bại!', toastConfig);
            console.log(error);
        });
    }

    function handleAddBook(body) {
        bookService.addBook(body)
        .then(() => {
            toast.success('Thêm thành công!', toastConfig);
            navigate('/admin/books');
        })
        .catch(error => {
            toast.error('Thêm thất bại!', toastConfig);
            console.log(error);
        });
    }

    function handleChangeImage(e) {
        URL.revokeObjectURL(formik.values?.image?.preview);

        let file = e.target.files[0];

        if (file.type.includes('image/')) {
            file.preview = URL.createObjectURL(file);

            formik.setFieldValue('image', file);
        } else {
            alert('Định dạng ảnh không hợp lệ!');
            formik.setFieldValue('image', null);
        }

        e.target.value = null;
    }

    return (
        <form onSubmit={formik.handleSubmit}>

            <div className="form-group">
                <label htmlFor="name">Tên sách</label>
                <input type="text" className="form-control" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} placeholder="Tên sách..." />
                {formik.errors.name && formik.touched.name && <p className="text-danger">{formik.errors.name}</p>}
            </div>

            <div className="form-group mt-2">
                <label htmlFor="description">Mô tả</label>
                <textarea type="text" className="form-control" id="description" name="description" value={formik.values.description} onChange={formik.handleChange} rows="2" placeholder="Mô tả..." />
            </div>

            <div className="form-group">
                <label htmlFor="price">Giá sách</label>
                <input type="number" className="form-control" id="price" name="price" value={formik.values.price} onChange={formik.handleChange} placeholder="Giá..." />
                {formik.errors.price && formik.touched.price && <p className="text-danger">{formik.errors.price}</p>}
            </div>

            <div className="form-group mt-2">
                <label htmlFor="author">Tác giả</label>
                <select className="form-control" id="author" name="author_id" onChange={formik.handleChange}>
                    <option value="0">---- Chọn tác giả ----</option>
                    {data.authors?.map((author, index) => <option key={index} value={author?.id} selected={book?.author?.id === author.id}>{author?.name}</option>)}
                </select>
            </div>

            <div className="form-group mt-2">
                <label htmlFor="category">Danh mục</label>
                <select className="form-control" id="category" name="category_id" onChange={formik.handleChange}>
                    <option value="0">---- Chọn danh mục ----</option>
                    {data.categories?.map((category, index) => <option key={index} value={category?.id} selected={book?.category?.id === category.id}>{category?.name}</option>)}
                </select>
            </div>

            <div className="form-group mt-2">
                <label htmlFor="publisher">Nhà xuất bản</label>
                <select className="form-control" id="publisher" name="publisher_id" onChange={formik.handleChange}>
                    <option value="0">---- Chọn nhà xuất bản ----</option>
                    {data.publishers?.map((publisher, index) => <option key={index} value={publisher?.id} selected={book?.publisher?.id === publisher.id}>{publisher?.name}</option>)}
                </select>
            </div>

            <div className="form-group mt-2">
                <label htmlFor="image" className="btn btn-primary">Chọn ảnh</label>
                <input type="file" accept="image/*" className="form-control-file" id="image" name="image" style={{display: 'none'}} onChange={handleChangeImage} />
            </div>

            {formik.values.image ? <img src={formik.values.image.preview} alt="book"/> : type === 'detail' ? <img src={`http://localhost:8080/images/${book?.thumbnail}`} alt="book" /> : null}

            <div className="form-group mt-2">
                <input type="submit" className="btn btn-primary" value={`${type === 'detail' ? 'Sửa' : 'Thêm'} sách`} />
                <Link to="/admin/books" className="btn btn-outline-primary" style={{ marginLeft: '4px' }}>Hủy</Link>
            </div>

        </form>
    );
}

export default FormBook;