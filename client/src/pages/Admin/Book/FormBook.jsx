
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLayoutEffect, useState } from 'react';

import bookService from '../../../services/bookService';
import { toast } from 'react-toastify';
import { toastConfig } from '../../../configs/toastConfig';
import authorService from '../../../services/authorService';
import categoryService from '../../../services/categoryService';
import publisherService from '../../../services/publisherService';

function FormBook() {

    const [ authors, setAuthors ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ publishers, setPublishers ] = useState([]);

    const navigate = useNavigate();

    useLayoutEffect(() => {
        (async() => {
            const authorsArray = await authorService.getAllAuthors();
            const categoriesArray = await categoryService.getAllCategories();
            const publishersArray = await publisherService.getAllPublishers();
    
            console.log(authorsArray, categoriesArray, publishersArray);
    
            setAuthors(authorsArray);
            setCategories(categoriesArray);
            setPublishers(publishersArray);
        })();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            author_id: null,
            category_id: null,
            publisher_id: null,
            image: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Tên không được bỏ trống!').max(40, 'Tên không được quá 40 ký tự'),
        }),
        onSubmit: function (values) {
            console.log(values);
            handleAddBook(values);            
        }
    });

    function handleAddBook(body) {
        bookService.addBook(body)
        .then(res => {
            toast.success('Thêm thành công!', toastConfig);
            navigate('/admin/books');
        })
        .catch(error => {
            toast.error('Thêm thất bại!', toastConfig);
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

            <div className="form-group mt-2">
                <label htmlFor="author">Tác giả</label>
                <select className="form-control" id="author" name="author_id" onChange={formik.handleChange}>
                    <option value="0">---- Chọn tác giả ----</option>
                    {authors.map(author => <option value={author.id}>{author.name}</option>)}
                </select>
            </div>

            <div className="form-group mt-2">
                <label htmlFor="category">Danh mục</label>
                <select className="form-control" id="category" name="category_id" onChange={formik.handleChange}>
                    <option value="0">---- Chọn danh mục ----</option>
                    {categories.map(category => <option value={category.id}>{category.name}</option>)}
                </select>
            </div>

            <div className="form-group mt-2">
                <label htmlFor="publisher">Nhà xuất bản</label>
                <select className="form-control" id="publisher" name="publisher_id" onChange={formik.handleChange}>
                    <option value="0">---- Chọn nhà xuất bản ----</option>
                    {publishers.map(publisher => <option value={publisher.id}>{publisher.name}</option>)}
                </select>
            </div>

            <div className="form-group mt-2">
                <label htmlFor="image" className="btn btn-primary">Chọn ảnh</label>
                <input type="file" accept="image/*" className="form-control-file" id="image" name="image" style={{display: 'none'}} onChange={handleChangeImage} />
            </div>

            {formik.values.image && <img src={formik.values.image.preview} alt="book"/>}

            <div className="form-group mt-2">
                <input type="submit" className="btn btn-primary" value="Thêm sách" />
                <Link to="/admin/books" className="btn btn-outline-primary" style={{ marginLeft: '4px' }}>Hủy</Link>
            </div>

        </form>
    );
}

export default FormBook;