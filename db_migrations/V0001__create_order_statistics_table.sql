-- Таблица для хранения статистики заказов блюд
CREATE TABLE order_statistics (
    id SERIAL PRIMARY KEY,
    dish_name VARCHAR(255) NOT NULL,
    times_ordered INTEGER DEFAULT 0 NOT NULL,
    total_earned DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индекс для быстрого поиска по названию блюда
CREATE INDEX idx_dish_name ON order_statistics(dish_name);

-- Комментарии к таблице и колонкам
COMMENT ON TABLE order_statistics IS 'Статистика заказов блюд';
COMMENT ON COLUMN order_statistics.dish_name IS 'Название блюда';
COMMENT ON COLUMN order_statistics.times_ordered IS 'Сколько раз заказали';
COMMENT ON COLUMN order_statistics.total_earned IS 'Сколько заработали денег';
