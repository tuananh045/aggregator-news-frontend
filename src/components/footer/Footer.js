import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="w-100">
            <div className="footer-top w-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="footer_title">
                                <h2>VỀ CHÚNG TÔI</h2>
                            </div>
                            <div className="footer_block_item">
                                <p><b>Tinmoi</b></p>
                            </div>
                            <div className="footer_block_item">
                                <p><i className="far fa-envelope" style={{ paddingRight: '10px' }} />abcxyz@gmail.com</p>
                            </div>
                            <div className="footer_block_item">
                                <p><i className="fas fa-phone-alt" style={{ paddingRight: '10px' }} />0123456789</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="footer_title">
                                <h2>DANH MỤC</h2>
                            </div>
                            <div className="footer_block_item">
                                <p><i className="fas fa-hand-point-right" style={{ paddingRight: '10px' }} />
                                    <Link to='/thoi-su'>Thời sự</Link>
                                </p>
                            </div>
                            <div className="footer_block_item">
                                <p><i className="fas fa-hand-point-right" style={{ paddingRight: '10px' }} />
                                    <Link to='/the-gioi'>Thế giới</Link>
                                </p>
                            </div>
                            <div className="footer_block_item">
                                <p><i className="fas fa-hand-point-right" style={{ paddingRight: '10px' }} />
                                    <Link to='/kinh-doanh'>Kinh doanh</Link>
                                </p>
                            </div>
                            <div className="footer_block_item">
                                <p><i className="fas fa-hand-point-right" style={{ paddingRight: '10px' }} />
                                    <Link to='/giao-dục'>Giáo dục</Link>
                                </p>
                            </div>
                            <div className="footer_block_item">
                                <p><i className="fas fa-hand-point-right" style={{ paddingRight: '10px' }} />
                                    <Link to='/giai-tri'>Giải trí</Link>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="footer_title">
                                <h2>TIN TỨC NỔI BẬT</h2>
                            </div>
                            <div className="footer_block_item">
                                <p><i className="fas fa-hand-point-right" style={{ paddingRight: '10px' }} />Năng lượng Mặt trời: Những ý tưởng sáng tạo và ngộ nghĩnh</p>
                            </div>
                            <div className="footer_block_item">
                                <p><i className="fas fa-hand-point-right" style={{ paddingRight: '10px' }} />Hà Nội: Đẩy nhanh điện khí hóa nông thôn</p>
                            </div>
                            <div className="footer_block_item">
                                <p><i className="fas fa-hand-point-right" style={{ paddingRight: '10px' }} />Ngân hàng có kế hoạch tuyển hàng nghìn nhân sự</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="footer_title">
                                <h2>FANPAGE</h2>
                            </div>
                            <div className="footer_block_item">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_bottom w-100">
                <p>© 2020 All right reserved - Bản quyền thuộc về <b>ME</b></p>
            </div>
        </footer>
    )
}
