"use client"

interface DeleteButtonProps {
    curso: Curso;
    onDelete: () => void;
}


const DeleteButton: React.FC<DeleteButtonProps> = ({ curso, onDelete }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/curso/${curso.id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir curso');
            }
            onDelete(); // Chamada de retorno para atualizar a lista após a exclusão
        } catch (error) {
            console.error('Erro ao excluir curso:', error);
            // Aqui você pode adicionar lógica para exibir uma mensagem de erro
        }
    };

    return (
        <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Excluir Curso
        </button>
    );
};

export default DeleteButton;