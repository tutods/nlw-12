import { Camera } from 'lucide-react';

import { MediaPicker } from '@/components/form/MediaPicker';

type Props = {};

export const NewMemoryFormHeader = ({}: Props) => {
  return (
    <>
      <section className="flex items-center gap-4">
        <div className="relative">
          <label
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
            htmlFor="media"
          >
            <Camera className="h-4 w-4" />
            Anexar media
          </label>
        </div>

        <label
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          htmlFor="isPublic"
        >
          <input
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            id="isPublic"
            name="isPublic"
            type="checkbox"
            value="true"
          />
          Tornar memória pública
        </label>
      </section>
      <MediaPicker id="media" name="coverUrl" />
    </>
  );
};
