import { Content } from 'antd/lib/layout/layout'
import BreadCrumd from 'components/admin/breadcrumb/BreadCrumd'
import { Form, Input, Button, Select, message, Spin, Upload, Image } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react'
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import CommonForm from 'components/admin/form/CommonForm';

const { Dragger } = Upload;
const { Option } = Select;
const cloudName = 'huong-news';
const unsignedUploadPreset = 'rtwfq3oq';


const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    hide: false
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdDate',
    hide: true
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updatedDate',
    hide: true
  },
  {
    title: 'Trạng thái',
    dataIndex: 'display',
    hide: true
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    hide: true
  },
];

export default function AddPost() {

  const [post, setPost] = useState({
    title: '',
    author_name: '',
    content: '',
    image: '',
    tag_names: []
  });

  const [authors, setAuthors] = useState([]);
  const [tags, setTags] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([fetchAuthorList(), fetchTagList()]);
  }, [])

  const onOpenModal = () => {
    setOpenModal(true);
  }

  const onCloseModal = () => {
    setOpenModal(false);
  }

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetchPostById(params.id);
    } else {
      clearContent();
    }
  }, [params.id])

  const handleAddAuthor = async (item) => {
    try {
      const res = await axios.post(`/api/post/author`, item);
      fetchAuthorList();
      message.success(res.data.message)
      onCloseModal();
    } catch (err) {
      message.error(err.response.data.message)
      console.log(err);
    }
  };

  async function fetchPostById(id) {
    try {
      const response = await axios.get(`/api/post/id/${id}`);
      setPost(response.data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchAuthorList() {
    try {
      const response = await axios.get('/api/post/author');
      setAuthors(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTagList() {
    try {
      const response = await axios.get('/api/news/tag', { params: { limit: 100 } });
      setTags(response.data.content);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeEditor = (content, editor) => {
    setPost({
      ...post,
      content: content
    })
  }

  const clearContent = () => {
    setPost({
      author_name: "",
      author_slug: "",
      category_name: "",
      category_slug: "",
      content: "",
      createdDate: "",
      display: null,
      id: null,
      slug: "",
      title: "",
      updatedDate: null,
      tag_names: []
    })
  }

  const handleSubmit = async () => {
    setLoading(true);
    const newPost = { ...post };
    newPost.category_slug = 'bai-viet'
   // console.log(newPost);
    if (newPost.id) {
      try {
        const res = await axios.put(`/api/post/update/${newPost.id}`, newPost);
        message.success(res.data.message);
        clearContent();
        setLoading(false);
      } catch (err) {
        message.error(err.response.data.message)
        console.log(err);
        setLoading(false);
      }
    } else {
      try {
        const res = await axios.post(`/api/post/add`, newPost);
        message.success(res.data.message)
        clearContent();
        setLoading(false);
      } catch (err) {
        message.error(err.response.data.message)
        console.log(err);
        setLoading(false);
      }
    }
  };

  function handleChange(value) {
    setPost({
      ...post,
      tag_names: value
    })
  }

  const props = {
    name: 'file',
    multiple: false,
    action: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    customRequest(info) {
      const { onSuccess } = info;
      const fd = new FormData();
      // const config = {
      //   onUploadProgress: event => {
      //     const percent = Math.floor((event.loaded / event.total) * 100);
      //     setProgress(percent);
      //     if (percent === 100) {
      //       setTimeout(() => setProgress(0), 1000);
      //     }
      //     onProgress({ percent: (event.loaded / event.total) * 100 });
      //   }
      // };
      fd.append('upload_preset', unsignedUploadPreset);
      fd.append('tags', 'browser_upload');
      fd.append('file', info.file);
      axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, fd)
        .then((res) => {
          setPost({
            ...post,
            image: res.data.url
          })
          onSuccess("Ok");
        })
        .catch(err => console.log(err))
      // const { status } = info.file;
      // if (status !== 'uploading') {
      //   console.log("uploading", info.file, info.fileList);
      // }
      // if (status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        // console.log("uploading", info.file, info.fileList);
      }
      if (status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully.`);
        message.success(`Upload hình ảnh thành công!`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (

    loading ? <Spin tip="Loading..."></Spin> : (
      <Content style={{ margin: '0 16px' }}>
        <BreadCrumd title='Bài viết' subtitle={params.id ? 'Cập nhật' : 'Thêm mới'} />
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
            <Form.Item
              name='title'
              label="Title"
              rules={[{ required: true, },]}>
              <Input placeholder='Title' value={post.title} onChange={(e) => setPost({
                ...post,
                title: e.target.value
              })} />
            </Form.Item>
            <Form.Item
              label="Author"
              rules={[{ required: true, },]}
              style={{ width: '100%' }}
            >
              <Select
                showSearch
                placeholder="Author"
                optionFilterProp="children"
                onChange={(value) => setPost({
                  ...post,
                  author_name: value
                })}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{ width: '75%' }}
                value={post?.author_name}
              >
                {
                  authors.map((item, index) => {
                    return (
                      <Option key={index} value={item.name}>{item.name}</Option>
                    )
                  })
                }
              </Select>
              <Button style={{ width: '20%', float: 'right' }} type="primary" htmlType="submit" icon={<PlusOutlined />} onClick={onOpenModal}>
                Thêm tác giả
              </Button>
            </Form.Item>
            <Form.Item
              label="Content"
              rules={[{ required: true, },]}
            >
              <Editor
                apiKey="0oiczdkt4b8lgo9kjmvrzsscibe0knl9d1cru6fr22ie2189"
                value={post.content}
                init={{
                  images_upload_base_path: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                  images_upload_credentials: true,
                  height: 500,
                  menubar: false,
                  // plugins: 'print preview paste importcss searchreplace autolink autosave save code visualblocks visualchars fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help charmap quickbars',
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar: 'undo redo | formatselect fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                  image_title: true,
                  automatic_uploads: true,
                  file_picker_types: 'image',
                  file_picker_callback: function (cb, value, meta) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
                    var xhr = new XMLHttpRequest();
                    var fd = new FormData();
                    xhr.open('POST', url, true);

                    input.onchange = function () {
                      var file = this.files[0];
                      var reader = new FileReader();
                      xhr.onload = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                          var response = JSON.parse(xhr.responseText);
                          var url = response.secure_url;
                          cb(url, { title: response.original_filename });
                        }
                      };

                      reader.onload = function () {
                        var id = 'blobid' + (new Date()).getTime();
                        var blobCache = window.tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];
                        var blobInfo = blobCache.create(id, file, base64);
                        blobCache.add(blobInfo);
                        fd.append('upload_preset', unsignedUploadPreset);
                        fd.append('tags', 'browser_upload');
                        fd.append('file', blobInfo.blob(), blobInfo.filename());
                        xhr.send(fd);
                      };
                      reader.readAsDataURL(file);
                    };

                    input.click();
                  },
                  images_upload_handler: (blobInfo, success, failure) => {
                    let data = new FormData();
                    var reader = new FileReader();
                    var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
                    data.append('file', blobInfo.blob(), blobInfo.filename());
                    data.append('upload_preset', unsignedUploadPreset);
                    data.append('tags', 'browser_upload');
                    axios.post(url, data)
                      .then(function (res) {
                        success(res.data.secure_url)
                      })
                      .catch(function (err) {
                        console.log(err)
                      });
                    reader.readAsDataURL(blobInfo.blob())
                  },
                }}
                onEditorChange={handleChangeEditor}
              />
            </Form.Item>
            <Form.Item
              label="Tags"
              rules={[{ required: true, },]}
            >
              <Select mode="tags" style={{ width: '100%' }} value={post?.tag_names} placeholder="Tags" onChange={handleChange}>
                {
                  tags.map((item) => {
                    return (
                      <Option key={item.name}>{item.name}</Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Nhấn hoặc kéo thả hình ảnh vào đây để tải lên</p>
              </Dragger>
              {
                post.image ? (
                  <Image
                    width={300}
                    src={post.image}
                  />
                ) : null
              }
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
              <Button onClick={handleSubmit} size='large' type="primary" htmlType="submit">
                {
                  params.id ? 'Cập nhật bài viết' : 'Thêm bài viết'
                }
              </Button>
            </Form.Item>
          </Form>
          <CommonForm fields={columns} openModal={openModal} item={{}} handleSubmit={handleAddAuthor} onCloseModal={onCloseModal} />
        </div>
      </Content >
    )
  )
}
