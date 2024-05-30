import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Command, CommandInput } from '@/components/ui/command';
import { Badge } from '../ui/badge';

interface SizeType {
    _id: string;
    title: string;
}

interface MultiSelectSizeProps {
    placeholder: string;
    sizes: SizeType[];
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const MultiSelectSize: React.FC<MultiSelectSizeProps> = ({
    placeholder,
    sizes,
    value,
    onChange,
    onRemove,
}) => {
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);

    const selectedSizes = value.map((id) =>
        sizes.find((size) => size._id === id)
    ) as SizeType[];

    const selectableSizes = sizes.filter(
        (size) => !selectedSizes.includes(size)
    );

    const handleSelect = (sizeId: string) => {
        onChange(sizeId);
        setInputValue('');
    };

    return (
        <Command className='overflow-visible bg-white'>
            <div className='flex gap-1 flex-wrap border rounded-md'>
                {selectedSizes.map((size) => (
                    <Badge key={size._id}>
                        {size.title}
                        <button
                            type='button'
                            className='ml-1 hover:text-red-1'
                            onClick={() => onRemove(size._id)}
                        >
                            <X className='h-3 w-3' />
                        </button>
                    </Badge>
                ))}

                <CommandInput
                    placeholder={placeholder}
                    value={inputValue}
                    onValueChange={setInputValue}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                    readOnly
                />
            </div>

            {open && (
                <div className='relative mt-2'>
                    <div className='absolute w-full z-30 top-0 overflow-auto border rounded-md shadow-md'>
                        {selectableSizes.map((size) => (
                            <div
                                key={size._id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleSelect(size._id)}
                                className='bg-grey-2 cursor-pointer hover:bg-gray-400'
                            >
                                {size.title}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Command>
    );
};

export default MultiSelectSize;
