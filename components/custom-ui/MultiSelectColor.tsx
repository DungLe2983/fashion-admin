import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Command, CommandInput } from '@/components/ui/command';
import { Badge } from '../ui/badge';

interface ColorType {
    _id: string;
    title: string;
}

interface MultiSelectColorProps {
    placeholder: string;
    colors: ColorType[];
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const MultiSelectColor: React.FC<MultiSelectColorProps> = ({
    placeholder,
    colors,
    value,
    onChange,
    onRemove,
}) => {
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);

    const selectedColors = value.map((id) =>
        colors.find((color) => color._id === id)
    ) as ColorType[];

    const selectableColors = colors.filter(
        (color) => !selectedColors.includes(color)
    );

    const handleSelect = (colorId: string) => {
        onChange(colorId);
        setInputValue('');
    };

    return (
        <Command className='overflow-visible bg-white'>
            <div className='flex gap-1 flex-wrap border rounded-md'>
                {selectedColors.map((color) => (
                    <Badge key={color._id}>
                        {color.title}
                        <button
                            type='button'
                            className='ml-1 hover:text-red-1'
                            onClick={() => onRemove(color._id)}
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
                        {selectableColors.map((color) => (
                            <div
                                key={color._id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleSelect(color._id)}
                                className='bg-grey-2 cursor-pointer hover:bg-gray-400'
                            >
                                {color.title}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Command>
    );
};

export default MultiSelectColor;
