import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';

const SkillAutocomplete = ({ onSkillSelect, selectedSkill }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event, value) => {
    if (value) {
      onSkillSelect(value);
    }
  };

  return (
    <Autocomplete
      options={skills}
      getOptionLabel={(option) => option.name || ''}
      loading={loading}
      value={skills.find((s) => s.name === selectedSkill) || null}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Skills"
          placeholder="Type to search..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      noOptionsText="No skills found"
    />
  );
};

export default SkillAutocomplete;
