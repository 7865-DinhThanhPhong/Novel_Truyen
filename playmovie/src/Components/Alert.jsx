import { useState, useEffect } from 'react';

function Alert({ message, type = 'success', onClose }) {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
            onClose && onClose(); // Gọi hàm onClose nếu được truyền vào
        }, 5000); // Ẩn thông báo sau 5 giây

        return () => clearTimeout(timer); // Xóa timer khi component unmount
    }, [onClose]);

    if (!showAlert) {
        return null; // Không render nếu showAlert là false
    }

    const alertClasses = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
    };

    return (
        <div className={`border px-4 py-3 rounded relative bg-black ${alertClasses[type]}`}>

            <span className="block sm:inline">{message}</span>
            <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => {
                    setShowAlert(false);
                    onClose && onClose();
                }}
            >
                <svg className="fill-current h-6 w-6 text-gray-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
            </span>
        </div>
    );
}

export default Alert;