const TotalResource = {
    A: 10,
    B: 5,
    C: 7
};



const totalAllocate = {
    A: 0,
    B: 0,
    C: 0
}

const process_list = [
    {
        name: "p0",
        need: {
            A: 7,
            B: 5,
            C: 3
        },
        allocate: {
            A: 0,
            B: 1,
            C: 0
        },
        executed: false
    },
    {
        name: "p1",
        need: {
            A: 3,
            B: 2,
            C: 2
        },
        allocate: {
            A: 2,
            B: 0,
            C: 0
        },
        executed: false
    },
    {
        name: "p2",
        need: {
            A: 9,
            B: 0,
            C: 2
        },
        allocate: {
            A: 3,
            B: 0,
            C: 2
        },
        executed: false
    },
    {
        name: "p3",
        need: {
            A: 4,
            B: 2,
            C: 2
        },
        allocate: {
            A: 2,
            B: 1,
            C: 1
        },
        executed: false
    },
    {
        name: "p4",
        need: {
            A: 5,
            B: 3,
            C: 3
        },
        allocate: {
            A: 0,
            B: 0,
            C: 2
        },
        executed: false
    }
];





document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') {
        ShowResources();
    showAllocation();
    }
   
})

function showAllocation(){
    PrintTotalResources();
    printAvailable();
    PrintBeingUsed();
    printSafeSequnece();
}

function PrintTotalResources(){
    document.getElementById('available_max').innerHTML =""
    for (const key in TotalResource) {
        if (Object.hasOwnProperty.call(TotalResource, key)) {
            const element = TotalResource[key];
            document.getElementById('available_max').innerHTML += key + ":" + element + " ";
        }
    }
}

function printAvailable(){
    document.getElementById('available').innerHTML =""
    for (const key in totalAllocate) {
        if (Object.hasOwnProperty.call(totalAllocate, key)) {
            const element = totalAllocate[key];
            document.getElementById('available').innerHTML += key + ":" + (TotalResource[key]-element) + " ";
        }
    }

}

function PrintBeingUsed(){
    document.getElementById('being_used').innerHTML =""
    for (const key in totalAllocate) {
        if (Object.hasOwnProperty.call(totalAllocate, key)) {
            const element = totalAllocate[key];
            document.getElementById('being_used').innerHTML += key + ":" + (element) + " ";
        }
    }
}

function ShowResources() {
    console.log(TotalResource);
    document.getElementById('table_body').innerHTML = ` <tr>
        <th>Process</th>
        <th>Allocation</th>
        <th>Need</th>
        <th>Reamining Need</th>
    </tr>`;
   //hide the form
    process_list.forEach(element => {
        element.remaining = {
            A: element.need.A - element.allocate.A,
            B: element.need.B - element.allocate.B,
            C: element.need.C - element.allocate.C
        }
        const tr = document.createElement('tr');
        const td_name = document.createElement('td');
        const td_need = document.createElement('td');
        const td_allocate = document.createElement('td');
        const td_remaining_need = document.createElement('td');
        const td_available = document.createElement('td');
        tr.appendChild(td_name);
        tr.appendChild(td_allocate);
        tr.appendChild(td_need);
        tr.appendChild(td_remaining_need);
        tr.appendChild(td_available);
        tr.setAttribute('id', element.name);
        tr.setAttribute('class', element.executed ? 'bg-success' : '');
        td_name.innerText = element.name;
        for(const key in element.allocate) {
            if (Object.hasOwnProperty.call(element.allocate, key)) {
                const data = element.allocate[key];
                td_allocate.innerText += key + ":" + data + " ";
                totalAllocate[key] += data;
            }
        };
        for(const key in element.need) {
            if (Object.hasOwnProperty.call(element.need, key)) {
                const data = element.need[key];
                td_need.innerText += key + ":" + data + " ";
            }
        };
        for(const key in element.remaining) {
            if (Object.hasOwnProperty.call(element.remaining, key)) {
                const data = element.remaining[key];
                td_remaining_need.innerText += key + ":" + data + " ";
            }
        };
        document.getElementById('table_body').appendChild(tr);        

    });
    
}
const safe_sequnece = [];

function printSafeSequnece(){
    document.getElementById('safe').innerHTML ="Safe Sequence : "
    safe_sequnece.forEach(element => {
        document.getElementById('safe').innerHTML += `<span class="p-2 bg-warning text-bold">${element}</span>` + " ";
    });
}

function Schedule(){
    document.getElementById('sbtn').disabled = true;
    document.getElementById('sbtn').innerText = "Processing...";

    for (const element of process_list){
        if(!element.executed && 
            element.remaining.A + totalAllocate.A <= TotalResource.A && 
            element.remaining.B + totalAllocate.B <= TotalResource.B && 
            element.remaining.C + totalAllocate.C <= TotalResource.C
            ){
            element.executed = true;
            safe_sequnece.push(element.name);
            totalAllocate.A -= element.allocate.A;
            totalAllocate.B -= element.allocate.B;
            totalAllocate.C -= element.allocate.C;
            document.getElementById(element.name).setAttribute('class', 'bg-success text-white');
            showAllocation();
            break;
        }
    };

    if(safe_sequnece.length !== process_list.length){
        setTimeout(Schedule, 2000);
    }else{
        document.getElementById('sbtn').innerText = "Done ✔";
        return;
    }
   
   
   
}

