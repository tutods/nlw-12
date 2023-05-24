'use client';

import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

import { NewMemoryFormHeader } from '@/components/memories/new/Form/partials/FormHeader';
import { api } from '@/lib/api';

type Props = {};

export const NewMemoryForm = ({}: Props) => {
  const router = useRouter();

  const handleCreateMemory = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const fileToUpload = formData.get('coverUrl');

    let coverUrl = '';

    if (!!fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set('file', fileToUpload);

      const { data: uploadResponse } = await api.post(
        '/upload',
        uploadFormData,
      );

      coverUrl = uploadResponse.fileUrl;
    }

    const token = Cookie.get('token');
    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    router.push('/');
  };

  return (
    <form className="flex flex-1 flex-col gap-2" onSubmit={handleCreateMemory}>
      <NewMemoryFormHeader />

      <textarea
        className="mt-2 w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        id="content"
        name="content"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        spellCheck={false}
      />

      <button
        className="inline-block place-self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
        type="submit"
      >
        Salvar
      </button>
    </form>
  );
};
