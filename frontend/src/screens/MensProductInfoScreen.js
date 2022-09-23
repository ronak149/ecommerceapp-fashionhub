import { useParams } from 'react-router-dom';

const ProductInfoScreen = () => {
    const params = useParams();
    const {slug} = params;

    return (
        <h1>{slug}</h1>
    );
}

export default ProductInfoScreen;