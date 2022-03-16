import React from 'react'

export default function News({ title, data }) {
  return (
    <div className="news-item" style={{ paddingTop: '20px' }}>
      <span>{title}</span>
      <p></p>
      <div className="row" style={{ paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
        <div className="col-lg-8 col-md-6">
          <div className="title">
            <a href={data[0]?.url} target='_blank' rel="noreferrer" >{data[0]?.title}</a>
          </div>
          <div className="news-item-left">
            <a href={data[0]?.url} target='_blank' rel="noreferrer">
              <img src={data[0]?.image} alt="" />
            </a>
            <p>
              {data[0]?.short_description}
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-sm-12">
          {
            data.slice(1, 3).map(item => {
              return (
                <div className="news-item-right" key={item.id}>
                  <a href={item?.url} target='_blank' rel="noreferrer">
                    <img src={item?.image} alt="" />
                  </a>
                  <a href={item?.url} target='_blank' rel="noreferrer">
                    {item?.title}
                  </a>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="row">
        {
          data.slice(3).map(item => {
            return (
              <div className="col-sm-12 col-lg-4 w-100" key={item.id}>
                <div className="news-bottom w-100" style={{ paddingTop: '10px' }}>
                  <a href={item?.url} target='_blank' rel="noreferrer">
                    {item?.title}
                  </a>
                  <p>
                    {item?.short_description}
                  </p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
