fetch('https://EhsanGhodrati.ir/hut/update_golestan.json')
  .then(response =>  response.json())
  .then(data => {
    const version = document.getElementById('version');
  
    console.log(data.version);
    
    if(String(version.textContent) != String(data.version)){
      if(!data.update){
        version.classList.add('text-red-900', 'animate-pulse');
        version.innerText = version.textContent + ` قدیمی شده؛ به نسخه جدید ` + data.version +` آپدیت کنید.`;
        version.addEventListener('click', () => {
          window.open(data.url, '_blank');
        });
      }else{
        document.getElementById('main').classList.add('blur-md');
        document.getElementById('popup-version').classList.remove('hidden');
        document.getElementById('popup-title').innerText = data.title ;
        document.getElementById('popup-description').innerText = data.description;
        document.getElementById('popup-version-btn').innerHTML = version.textContent + ` <svg class="w-3 h-3 m-1  text-gray-400  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"></path>
        </svg> `+ data.version;
        document.querySelector('.update').addEventListener('click', () => {
          window.open(data.url, '_blank');
        });
      
      }
    }
  console.log(String(version.textContent), String(data.version));
  
  })
  .catch(error => {
    // console.error(error);
    // // document.querySelector('main').classList.add('blur-sm');
    // document.getElementById('popup-version').classList.remove('hidden');
    // document.getElementById('popup-title').innerText = 'مشکل در اتصال به اینترنت' ;
    // document.getElementById('popup-description').innerText = 'امکان ارتباط با سایت سازنده نیست.';
    // document.getElementById('popup-version-btn').classList.add('hidden');
    // document.querySelector('.update').classList.add('hidden');


    // alert(" مشکل در اتصال به اینترنت");
  });
          // console.log(data.id);
  


document.querySelector('.moreLink').addEventListener('click', () => {
   window.open('https://ehsanghodrati.ir/', '_blank');
});














