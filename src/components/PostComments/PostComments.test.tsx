import { fireEvent, render, screen } from '@testing-library/react';
import PostComment from '.';

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve adicionar dois comentários', () => {
        render(<PostComment/>);

        const campo = screen.getByTestId('campo-comentario');
        const botao = screen.getByTestId('botao-comentar');

        fireEvent.change(campo, { target: { value: 'Primeiro comentário do post' } });
        fireEvent.click(botao);

        fireEvent.change(campo, { target: { value: 'Segundo comentário do post' } });
        fireEvent.click(botao);

        const comentarios = screen.getAllByTestId('comentario');
        expect(comentarios).toHaveLength(2);
        expect(comentarios[0]).toHaveTextContent('Primeiro comentário do post');
        expect(comentarios[1]).toHaveTextContent('Segundo comentário do post');

        // o campo é limpo depois de cada comentário
        expect(campo).toHaveValue('');
    });
});
