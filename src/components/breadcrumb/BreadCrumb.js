import React from 'react'

export default function BreadCrumb({ title, subtitle }) {
    return (
        <div className="header-bottom">
            <p>
                <b>Trang chủ</b>
                {
                    subtitle ? (
                        <>
                            <i className="fas fa-chevron-right" style={{ padding: '0 10px' }}></i>
                            <b>{title}</b>
                            <i className="fas fa-chevron-right" style={{ padding: '0 10px' }}></i>
                            {subtitle}
                        </>
                    ) : (
                        <>
                            <i className="fas fa-chevron-right" style={{ padding: '0 10px' }}></i>
                            {title}
                        </>
                    )
                }
            </p>
        </div>
    )
}
