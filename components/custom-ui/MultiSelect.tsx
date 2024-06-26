import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Command, CommandInput } from '@/components/ui/command';
import { Badge } from '../ui/badge';

interface CategoryType {
    _id: string;
    name: string;
}

interface MultiSelectProps {
    placeholder: string;
    categories: CategoryType[];
    value: string[];
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    placeholder,
    categories,
    value,
    onChange,
    onRemove,
}) => {
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);

    const selectedCollections = value.map((id) =>
        categories.find((category) => category._id === id)
    ) as CategoryType[];

    const selectableCollections = categories.filter(
        (category) => !selectedCollections.includes(category)
    );

    const handleSelect = (categoryId: string) => {
        onChange(categoryId);
        setInputValue('');
    };

    return (
        <Command className='overflow-visible bg-white'>
            <div className='flex gap-1 flex-wrap border rounded-md'>
                {selectedCollections.map((category) => (
                    <Badge key={category._id}>
                        {category.name}
                        <button
                            type='button'
                            className='ml-1 hover:text-red-1'
                            onClick={() => onRemove(category._id)}
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
                        {selectableCollections.map((category) => (
                            <div
                                key={category._id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleSelect(category._id)}
                                className='bg-grey-2 cursor-pointer hover:bg-gray-400'
                            >
                                {category.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Command>
    );
};

export default MultiSelect;
