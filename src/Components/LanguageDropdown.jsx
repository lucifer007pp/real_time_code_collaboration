import Select from 'react-select';

const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
];

export default function LanguageDropdown({ selectedLanguage, onChange }) {
    const handleChange = (selectedOption) => {
        onChange(selectedOption.value);
    };

    const currentOption = languageOptions.find(opt => opt.value === selectedLanguage);

    return (
        <div className="w-48">
            <Select
                value={currentOption}
                onChange={handleChange}
                options={languageOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                isSearchable={false}
            />
        </div>
    );
}