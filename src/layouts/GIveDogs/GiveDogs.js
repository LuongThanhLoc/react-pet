import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/auth-contexts';

import { toast } from 'react-toastify';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { ages } from '../../config';

const GiveDogs = () => {
  const [imgDogs, setImgDogs] = useState();
  useEffect(() => {
    document.title = 'GiveDogs | Paradise for pets';
  }, []);

  const handleUploadImg = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log('empty');
        }
      },
      (error) => {
        toast.error('Có lỗi xảy ra');
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  };

  const onSeclectImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgDogs('img', file);
  };
  const { userInfo } = useAuth();

  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: (values, action) => {},
  });
  return (
    <>
      {userInfo ? (
        <form
          className='flex flex-col mx-auto my-10 w-fit'
          onSubmit={formik.handleSubmit}
          autoComplete='on'
        >
          <div className='flex flex-col mb-6 gap-y-2'>
            <Label htmlFor='file'>Upload File</Label>
            <Input type='file' id='file' multiple onChange={onSeclectImg} />
          </div>
          <div className='flex flex-col mb-6 gap-y-2'>
            <Label htmlFor='phoneNumber'>Upload phoneNumber</Label>
            <Input
              type='text'
              id='phoneNumber'
              className='cursor-not-allowed'
            />
          </div>
          <div className='flex flex-col mb-6 gap-y-2'>
            <Label htmlFor='nameDog'>Tên con vật</Label>
            <Input
              type='text'
              id='nameDog'
              placeholder='Vui lòng nhập tên con vật của bạn'
            />
          </div>
          <div className='flex flex-col mb-6 gap-y-2'>
            <Label htmlFor='hobbyDog'>Sở thích con vật</Label>
            <textarea
              name='hobbyDog'
              className='border-2 outline-none border-slate-200 focus:border-blue-500'
              id='hobbyDog'
              cols='30'
              rows='10'
            ></textarea>
          </div>
          <div className='flex flex-col mb-6 gap-y-2'>
            <Label htmlFor='ageDog'>Tuổi con vật</Label>
            <select
              className='p-3 border-2 outline-none border-slate-200 focus:border-blue-500'
              id='ageDog'
              name='ageDog'
            >
              {ages.map((item) => {
                return <option value='ageDog'>{item}</option>;
              })}
            </select>
          </div>
          {/* {imgDogs && <img src={imgDogs.preview} alt={'dogs'} />} */}
        </form>
      ) : (
        <>
          <div className='flex flex-col items-center justify-center mx-auto mt-14 gap-y-6'>
            <p className='text-3xl font-semibold'>
              Chức năng này chỉ khả dụng khi bạn đã đăng nhập!
            </p>
            <div className='text-xl'>
              <span>
                <Link className='mr-2 text-blue-500 ' to={'/sign-in'}>
                  Đăng nhập
                </Link>{' '}
                tại đây nhé
              </span>

              <p className='mt-5'>
                Nếu bạn chưa có tài khoản hãy
                <Link className='mx-2 text-blue-500' to={'/sign-up'}>
                  Đăng ký
                </Link>{' '}
                1 tài khoản nhé
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GiveDogs;
