const form1 = document.querySelector('#searchForm');
const result1 = document.querySelector('#tableresult');
var upd;

form1.addEventListener('submit',(e)=>{

    e.preventDefault();

    if(upd){
        clearTimeout(upd);
    }

    const ctype=form1.elements.cointype.value;

    fetchPrice(ctype);

});

const fetchPrice = async(ctype) => {
    const r= await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=INR`);
    const price= r.data.coin.price;
    const volume= r.data.coin.volume;
    const change= r.data.coin.priceChange1d;
    const base= r.data.coin.name;
    const target= 'INR';
    // const time= r.data.timestamp;

    result1.innerHTML=`                
        <tr>
            <th>Property</th>
            <th>Amount</th>
        </tr>
        <tr>
            <td>${base}</td>
            <td>${price} ${target}</td>
        </tr>
        <tr>
            <td>Volume</td>
            <td>${volume}</td>
        </tr>
        <tr>
            <td>Change</td>
            <td>${change}</td>
        </tr>
        `;

    upd=setTimeout(()=>fetchPrice(ctype),10000);

};