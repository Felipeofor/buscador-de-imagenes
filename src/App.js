import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './App.css';
import './content.css';
import './article.css';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const open = url => { window.open(url); };
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: ''}}
          onSubmit={async values =>{
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
              headers: {
                'Authorization': 'Client-ID Cb97RPCrmW1P-G0L_Jzo2_UAyf4WCLFG5mWmMKNZohk'
            }});
            const data = await response.json();
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field type="text" name="search" />
          </Form>
        </Formik>
            </header>
            <div className="container">
              <div className="center">
                {photos.map(photo => 
                <article key={photo.id} onClick={() => open(photo.links.html)}>
                  <img src={photo.urls.regular} alt={photo.alt_description} />
                  <p>{[photo.description, photo.alt_description].join(' - ')}</p>
                  </article>
                )}
              </div>
            </div>
    </div>
  );
}

export default App;
