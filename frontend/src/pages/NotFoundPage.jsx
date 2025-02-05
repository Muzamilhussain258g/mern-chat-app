import React from 'react'
import { Link } from 'react-router';

const NotFoundPage = () => {
    return (
        <div className="bg-base-200 flex items-center justify-center h-screen p-4">
            <div className="text-center">
                {/* 404 Illustration or Text */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-base-content">
                    404
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-base-content mt-4">
                    Oops! The page you're looking for doesn't exist.
                </p>

                {/* Back to Home Button */}
                <div className="mt-6 sm:mt-8">
                    <Link href="/" className="btn btn-primary">
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default NotFoundPage