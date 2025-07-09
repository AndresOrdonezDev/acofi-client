import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import type { UserConsecutiveById } from '../../types';
import EditConsecutiveForm from './EditConsecutiveForm';


type ConsecutiveFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data:UserConsecutiveById
};

export default function 
ConsecutiveFormModal({
  isOpen,
  onClose,
  data
}: 
ConsecutiveFormModalProps) {

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 bg-black/25"/>
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4 text-center"
                >
                  Editar consecutivo: 
                  <span 
                    className='bg-gray-200 px-2 py-1 rounded-lg ml-2'
                  >
                    {data.consecutive}</span>
                </Dialog.Title>

                <EditConsecutiveForm onClose={onClose}  dataEdit={data} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
