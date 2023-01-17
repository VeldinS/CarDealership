export async function uploadImage(img: object){
    const res = await fetch(`http://localhost:5000/images`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(img)
        }
    );
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Kreiranje novog oglasa nije uspjelo", status: res.status};
    }
}

export async function deleteImageById(id: number){
    const res = await fetch(`http://localhost:5000/images/${id}`, {method: "DELETE"});
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Brisanje slike nije uspjelo", status: res.status};
    }
}

export async function getAllCarImages(id: number){
    const res = await fetch(`http://localhost:5000/images?adId=${id}`);
    if(res.ok){
        return res.json();
    }
    else {
        return {error: "Brisanje slike nije uspjelo", status: res.status};
    }
}

export async function convertToBase64(file:any){
    return new Promise<any>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        }

        fileReader.onerror = (err) => {
            reject(err);
        }
    })
}