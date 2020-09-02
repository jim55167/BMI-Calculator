var btn = document.querySelector('.btn');
var list = document.querySelector('.list');
var allDelete = document.querySelector('.delete');
var bmiList = JSON.parse(localStorage.getItem('listData')) || []; //放在最外層 陣列才會有排序
var body = document.body;
var type;
var resultColor = document.querySelector('.result');
var bmiNumber = document.querySelector('.number-color');
var posture = document.querySelector('.posture');
var img = document.querySelector('.img');
checkList(bmiList);

//清空BMI Button
img.addEventListener('click',function(e){
    resultColor.classList.remove(type);
    bmiNumber.innerHTML = '';
    posture.innerHTML = '';
    bmiNumber.innerHTML = '看結果';
})

btn.addEventListener('click', function (e) {
    e.preventDefault();
    var tall = document.querySelector('.body-height').value; //身高
    var weight = document.querySelector('.body-weight').value;  //體重
    var bmiTotal = ''; //BMI值   
    var color = ''; //左列色塊
    var status = ''; //狀態
    // console.log(bmiTotal);
    if (tall !== '' && weight !== '') {
        var bmiNum = parseInt(weight / ((tall / 100) * (tall / 100))); //取bmi
        var bmiTotal = Math.round(bmiNum * 100) / 100; //顯示小數點後兩位
        // console.log(bmiTotal < 18.5, bmiTotal);
       
        if(type !== undefined) {
            resultColor.classList.remove(type);
            bmiNumber.innerHTML = '';
            posture.innerHTML = '';
        }
        switch (true) {
            case bmiTotal < 18.5:
                status = '過輕';
                color = '#31BAF9';
                type = 'blue'
                break;
            case bmiTotal >= 18.5 && bmiTotal < 24:
                status = '理想';
                color = '#86D73E';
                type = 'green'
                break;
            case bmiTotal >= 24 && bmiTotal < 27:
                status = '過重';
                color = '#FF982D';
                type = 'orange'
                break;
            case bmiTotal >= 27 && bmiTotal < 30:
                status = '輕度肥胖';
                color = '#FF6C02';
                type = 'dark'
                break;
            case bmiTotal >= 30 && bmiTotal < 35:
                status = '中度肥胖';
                color = '#FF6C02';
                type = 'dark2'
                break;
            case bmiTotal >= 35 && bmiTotal <= 100:
                status = '重度肥胖';
                color = '#FF1200';
                type = 'red'
                break;
            default:
                alert('不再範圍值內')
                break;
        }
        
        bmiList.push({
            tall: tall,
            weight: weight,
            bmiTotal: bmiTotal,
            color: color,
            status: status,
            date: today()
        })
        // console.log(bmiList);
        document.querySelector('.body-height').value = '';
        document.querySelector('.body-weight').value = '';

        checkList(bmiList);
        localStorage.setItem('listData', JSON.stringify(bmiList));    
        resultColor.classList.add(type);
        posture.innerHTML = status;
        bmiNumber.innerHTML = bmiTotal;
    } 
    else {
        alert('please take a note');
    }
})

function today(){
    var time = new Date();
    var date = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    return date;
}

body.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 13:
            var tall = document.querySelector('.body-height').value; //身高
            var weight = document.querySelector('.body-weight').value;  //體重
            var bmiTotal = ''; //BMI值   
            var color = ''; //左列色塊
            var status = ''; //狀態
            if (tall !== '' && weight !== '') {
                var bmiNum = parseInt(weight / ((tall / 100) * (tall / 100))); //取bmi
                var bmiTotal = Math.round(bmiNum * 100) / 100; //顯示小數點後兩位

                if(type !== undefined) {
                    resultColor.classList.remove(type);
                    bmiNumber.innerHTML = '';
                    posture.innerHTML = '';
                }
                switch (true) {
                    case bmiTotal < 18.5:
                        status = '過輕';
                        color = '#31BAF9';
                        type = 'blue'
                        break;
                    case bmiTotal >= 18.5 && bmiTotal < 24:
                        status = '理想';
                        color = '#86D73E';
                        type = 'green'
                        break;
                    case bmiTotal >= 24 && bmiTotal < 27:
                        status = '過重';
                        color = '#FF982D';
                        type = 'orange'
                        break;
                    case bmiTotal >= 27 && bmiTotal < 30:
                        status = '輕度肥胖';
                        color = '#FF6C02';
                        type = 'dark'
                        break;
                    case bmiTotal >= 30 && bmiTotal < 35:
                        status = '中度肥胖';
                        color = '#FF6C02';
                        type = 'dark2'
                        break;
                    case bmiTotal >= 35 && bmiTotal <= 100:
                        status = '重度肥胖';
                        color = '#FF1200';
                        type = 'red'
                        break;
                    default:
                        alert('不再範圍值內')
                        break;
                }                
                bmiList.push({
                    tall: tall,
                    weight: weight,
                    bmiTotal: bmiTotal,
                    color: color,
                    status: status,
                    date: today()
                })
                // console.log(bmiList);
                document.querySelector('.body-height').value = '';
                document.querySelector('.body-weight').value = '';

                checkList(bmiList);
                localStorage.setItem('listData', JSON.stringify(bmiList));
                resultColor.classList.add(type);
                posture.innerHTML = status;
                bmiNumber.innerHTML = bmiTotal;   

            }else {
                alert('please take a note');                       
            }
    }
})

function checkList(bmiList) {
    var str = '';
    var len = bmiList.length;
    // console.log(len);
    for (var i = 0; i < len; i++) {
        str += `<li data-num=${i} style="border-left: 7px solid ${bmiList[i].color}; box-shadow: 2px 0 3px 0 ${bmiList[i].color};" 
                    <div class="box-value"><a href="#" data-index=${i} class="far fa-trash-alt"></a>
                    <div class="show">${bmiList[i].status}</div>
                    <div class="text-value"><span>BMI</span><a>${bmiList[i].bmiTotal}</a></div>
                    <div class="text-value"><span>weight<a>${bmiList[i].weight}kg</a></span></div>
                    <div class="text-value"><span>height<a>${bmiList[i].tall}cm</a></span></div>
                    <div class="text-value"><span>${bmiList[i].date}</span></div></div></li>
                    `
    }
    list.innerHTML = str;
}

//單筆刪除
list.addEventListener('click', function (e) {
    e.preventDefault();
    // console.log(list);
    if (e.target.nodeName !== 'A') {
        return
    };
    var index = e.target.dataset.index;
    bmiList.splice(index, 1);
    checkList(bmiList);
    localStorage.setItem('listData', JSON.stringify(bmiList));
})

//全部刪除
allDelete.addEventListener('click', function (e) {
    bmiList = []; //資料清空
    localStorage.setItem('listData', JSON.stringify(bmiList));
    list.innerHTML = '' //畫面更新
})