import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import React from 'react';
import { useUser } from '../../contexts/userContext';
import { ProductType } from '../../utils/types/types';

const styles = {
    actions: { display: 'flex', gap: 12, marginTop: 16 },
    button: { minHeight: 32, padding: '0px 15px', fontSize: '1rem' },
};
interface ParfumAdminButtonsProps {
    product: ProductType;
}
const ParfumAdminButtons: React.FC<ParfumAdminButtonsProps> = ({ product }: ParfumAdminButtonsProps) => {

    const { fetchUser } = useUser();

    function handleEdit(event: React.MouseEvent<HTMLButtonElement>): void {
        throw new Error('Function not implemented.');
    }

    function handleDelete(event: React.MouseEvent<HTMLButtonElement>): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div style={{ ...styles.actions, justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleEdit}
                sx={{
                    ...styles.button,
                    background: 'linear-gradient(90deg, #57B9FF 0%, #3A8DFF 100%)',
                    boxShadow: '0 2px 8px rgba(87,185,255,0.15)',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
                startIcon={<FontAwesomeIcon icon={faPenToSquare} />}
            >
                Edit
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                size="medium"
                onClick={handleDelete}
                sx={{
                    ...styles.button,
                    borderColor: '#57B9FF',
                    color: '#3A8DFF',
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    '&:hover': {
                        borderColor: '#3A8DFF',
                        background: 'rgba(58,141,255,0.08)',
                    },
                }}
            >
                Delete
            </Button>
        </div>
    );
};

export default ParfumAdminButtons;