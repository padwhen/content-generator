import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";

interface SelectionBoxProps {
    label: string;
    description: string;
    options: { id: string, label: string, icon?: React.ReactElement }[],
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
}

export const SelectionBox: React.FC<SelectionBoxProps> = ({
    label, options, selected, setSelected, description
}) => {
    const toggleSelection = (_array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
        setArray(prev => 
            prev.includes(item)
            ? prev.filter(id => id !== item)
            : [...prev, item]
        )
    }
    return (
        <div className="mb-4">
            <Label className="text-lg font-semibold mb-2">{label} (required)</Label>
            <p className="italic text-black-200">{description}</p>
            <div className="flex flex-wrap gap-2 my-2">
                {options.map((option) => (
                    <Button 
                    key={option.id} 
                    type="button"
                    variant={selected.includes(option.id) ? "default" : "outline"}
                    onClick={() => toggleSelection(selected, setSelected, option.id)}
                    className="flex items-center space-x-1"
                    >
                        {option.icon && <span>{option.icon}</span>}
                        <span>{option.label}</span>
                    </Button>
                ))}
            </div>
            <div className="p-2 bg-white border border-pink-300 rounded-md min-h-[60px]">
                {selected.length === 0 ? (
                    <p className="text-gray-400">Selected items will appear here</p>
                ) : (
                    <div className="flex flex-wrap gap-1">
                        {selected.map((id) => {
                            const option = options.find(o => o.id === id)
                            return (
                                <span key={id} className="flex items-center gap-1 justify-center bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-2.5 rounded">
                                    {option?.icon} {option?.label}
                                </span>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}