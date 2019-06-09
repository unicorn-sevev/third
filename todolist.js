window.addEventListener("load", function () {
    let pig = document.querySelectorAll(".pig>li");
    let cow = 0;
    let content = document.querySelector(".ctt");
    let arr = [
        {id: 1, content: "端午交作业", times: "2019/06/04", status: false},
        {id: 2, content: "企业网站", times: "2019/06/05", status: true},
        {id: 3, content: "需求文档", times: "2019/06/06", status: false},
    ];

    let str=localStorage.getItem("arr");
    if(!str){
        saveDate();
        str =localStorage.getItem("arr")
    }
    arr =JSON.parse(str);

    pig.forEach(function (ele, index) {
        ele.onclick = function () {
            pig[cow].classList.remove("hot");
            this.classList.add("hot");
            cow = index;
            biaoji = this.getAttribute("type");
            /*     let arr2 = [];
                 switch (biaoji) {
                     case 'all':
                         arr2=arr;
                         break;
                     case 'done':
                         arr2=arr.filter(function (ele) {return ele.status;});
                         break;
                     case 'doing':
                         arr2=arr.filter(function (ele) {return !ele.status;});
                         break;
                 }*/
            /*
            * 多选框选中
            * */
            f(f1(biaoji));
        }
    });

    pig[0].onclick();//预点击
    //渲染
    function f1(biaoji) {
        let arr2 = [];
        switch (biaoji) {
            case 'all':
                arr2 = arr;
                break;
            case 'done':
                arr2 = arr.filter(function (ele) {
                    return ele.status;
                });
                break;
            case 'doing':
                arr2 = arr.filter(function (ele) {
                    return !ele.status;
                });
                break;
        }
        return arr2;
    }

    content.onclick = function (e) {
        let target = e.target;
        let id = target.parentNode.id;
        if (target.nodeName === "INPUT") {
            let ff = arr.filter(ele => ele.id == id)[0];
            ff.status = target.checked;
        } else if (target.nodeName === "DEL") {
            let index = arr.findIndex(ele => ele.id == id);
            arr.splice(index, 1);
        }
        saveDate();
        f(f1(biaoji));
    };

    function f(arr2) {
        let html = "";
        arr2.forEach(function (ele) {
            if (ele.status) {
                html += `
                <li id="${ele.id}">
                <input type="checkbox" checked> ${ele.content} <del>X</del> <span>${ele.times}</span>
                </li>
               `;
            } else {
                html += `
                <li id="${ele.id}">
                <input type="checkbox"> ${ele.content} <del>X</del> <span>${ele.times}</span>
                </li>
               `;
            }
        });
        content.innerHTML = html;
    }

    /////////////////////////本地存储/////////////////////////////////
    function saveDate(){
        localStorage.setItem('arr',JSON.stringify(arr))
    }
    ////////////////////////创建////////////////////////////////////
    let forms = document.forms[0];
    let text = forms.elements["content"];
    let btn = forms.elements["button"];

    btn.onclick=function () {
        let obj=creatobj();
        arr.push(obj);
        forms.reset();
        f(f1(biaoji));
        saveDate();
    };
/////////////////////////创建对象////////////////////////////////////////
    function creatobj() {
        let id = arr[arr.length -1].id +1;
        let content = text.value;
        let times =new Date().toISOString().slice(0,10);
        let status =false;
        return {id,content,times,status};
    }
});
