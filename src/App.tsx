import './App.css';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import Projects from './components/Projects.tsx';
import MapSection from './components/MapSection.tsx';
import MyPage from './components/MyPage.tsx';
import { useEffect, useRef } from 'react';
import 'fullpage.js';
import 'fullpage.js/dist/jquery.fullPage.css';
import ReactFullpage from '@fullpage/react-fullpage';

// 왜 JSX를 찾지 못하니??????
function App(): JSX.Element {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(window.fullpage_api){
      window.fullpage_api.setAllowScrolling(false);
        window.fullpage_api.setKeyboardScrolling(false);
    }
  },[]);

  return (    
      <ReactFullpage
        scrollingSpeed={700}
        controlArrows={false}
        render={() => (
          <ReactFullpage.Wrapper>
            <div className='section'>
              <div className="slide"><MapSection /></div>
              <div className="slide"><MyPage /></div>
            </div>
            <div className="section"><About /></div>
            <div className="section"><Projects /></div>
            <div className="section"><Contact /></div>
          </ReactFullpage.Wrapper>
        )}
      />
  );
}

export default App;
