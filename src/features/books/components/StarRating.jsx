import { useState } from 'react';

export default function StarRating({
    rating = 0,
    onRate,
    readonly = false,
    size = '0.9rem'
}) {
    const [hover, setHover] = useState(0);

    const handleClick = (value) => {
        if (!readonly && onRate) {
            onRate(value);
        }
    };

    return (
        <div className="d-flex align-items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <i
                    key={star}
                    className={`bi bi-star${star <= (hover || rating) ? '-fill' : ''
                        }`}
                    style={{
                        color: star <= (hover || rating) ? '#ffc107' : '#dee2e6',
                        fontSize: size,
                        cursor: readonly ? 'default' : 'pointer',
                        transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={() => !readonly && setHover(star)}
                    onMouseLeave={() => !readonly && setHover(0)}
                    onClick={() => handleClick(star)}
                ></i>
            ))}
            {rating > 0 && (
                <span className="text-muted ms-1" style={{ fontSize: '0.85rem' }}>
                    ({rating.toFixed(1)})
                </span>
            )}
        </div>
    );
}
