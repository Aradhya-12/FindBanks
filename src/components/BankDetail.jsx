import { useNavigate } from 'react-router-dom';

import backArrow from '../images/back_arrow.svg'
import bankLogo from '../images/bank.svg'

const BankDetail = ({bankData}) => {
  const router = useNavigate();

  const bankObj = [{
    heading: "Bank name:",
    data: bankData.bank_name,
  },
  {
    heading: "Bank IFSC:",
    data: bankData.ifsc,
  },
  {
    heading: "Bank branch:",
    data: bankData.branch,
  },
  {
    heading: "Bank state:",
    data: bankData.state,
  }, 
  {
    heading: "Bank Address:",
    data: bankData.address,
  },
]
  return (
    <div className='bankdetail_container'>
      <img onClick={() => router(-1)} src={backArrow} alt="backward" height={50} width={50}/>
      <div className='bankdetail_container-detail_box'>
        <img className='bank_image' src={bankLogo} alt={bankData.bank_name || "bank"} />
        <div className='bank_data'>
          <div className='flex-col'>
            <table>
              <thead>
                <tr>
                  <th> Heading </th>
                  <th> Details </th>
                </tr>
              </thead>
              <tbody>
                {bankObj.map((item) => (
                  <tr>
                    <td> {item.heading} </td>
                    <td> {item.data} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )

}

export default BankDetail;