// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import plus from '../assets/images/Plus.svg'
// import excel from '../assets/images/excel.svg'
// import businessman from '../assets/images/businessman.svg'
// import page from '../assets/images/page.svg'
// import folder from '../assets/images/folder.svg'
// import salary from '../assets/images/salary.svg'
// import form from '../assets/images/form.svg'
// import mail from '../assets/images/mail.svg'
// import holiday from '../assets/images/holiday.svg'
// import leave from '../assets/images/leave.svg'
// import wfh from '../assets/images/work-from-home.svg'
// import birthday from '../assets/images/birthday.svg'
// import anniversary from '../assets/images/anniversary.svg'
// import new_joinee from '../assets/images/new-joinee.svg'
// import eleanor from '../assets/images/eleanor-pena.png'
// import arlene from '../assets/images/arlene-mcCoy.png'
// import guy_hawkins from '../assets/images/guy-hawkins.png'
// import devon_lane from '../assets/images/devon-lane.png'
// import bessie from '../assets/images/bessie-cooper.png'
// import post from '../assets/images/post.svg'
// import polling from '../assets/images/polling.svg'

// const QuickAccess = () => {
//     const settings = {
//         dots: false, // Hide dots
//         infinite: false, // Disable infinite loop
//         speed: 500, // Transition speed
//         slidesToShow: 3.8, // Number of slides to show at once
//         slidesToScroll: 1, // Number of slides to scroll
//         responsive: [
//             {
//                 breakpoint: 1024, // For screens smaller than 1024px
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 },
//             },
//             {
//                 breakpoint: 600, // For screens smaller than 600px
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 },
//             },
//         ],
//     };

//     return (
//         <div className="contentBox">
//             <h3>Quick Access</h3>
//             <Slider {...settings}>
//                 <div className="quickAccessCol">
//                     <div className="quickAccessCard purpleCard">
//                         <div className="qAHead">
//                             <h4>Inbox</h4>
//                         </div>
//                         <div className="qABody">
//                             <p>Tasks waiting for your approval. Please click on take action for more details.</p>
//                             <img src={mail} alt="Inbox" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="quickAccessCol">
//                     <div className="quickAccessCard blueCard">
//                         <div className="qAHead">
//                             <h4>Holidays</h4>
//                         </div>
//                         <div className="qABody">
//                             <p>No holidays</p>
//                             <img src={holiday} alt="Holiday" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="quickAccessCol">
//                     <div className="quickAccessCard greenCard">
//                         <div className="qAHead">
//                             <h4>On Leave Today</h4>
//                         </div>
//                         <div className="qABody">
//                             <p>Everyone is working today! No one is on leave today.</p>
//                             <img src={leave} alt="Leave" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="quickAccessCol">
//                     <div className="quickAccessCard orangeCard">
//                         <div className="qAHead">
//                             <h4>Working Remotely</h4>
//                         </div>
//                         <div className="qABody">
//                             <p>Everyone is at office! No one is working remotely today.</p>
//                             <img src={wfh} alt="Work from Home" />
//                         </div>
//                     </div>
//                 </div>
//             </Slider>
//         </div>
//     );
// };

// export default QuickAccess;

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mail from '../assets/images/mail.svg';
import holiday from '../assets/images/holiday.svg';
import leave from '../assets/images/leave.svg';
import wfh from '../assets/images/work-from-home.svg';

const QuickAccess = () => {
    const settings = {
        dots: false, 
        infinite: false, 
        speed: 500, 
        slidesToShow: 3.8, 
        slidesToScroll: 1, 
        autoplay: false,
        arrows: false, 
        swipeToSlide: true, // Allow mouse drag to move items
        draggable: true,
        responsive: [
            { breakpoint: 1000, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 0, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <div className="contentBox">
            <h3>Quick Access</h3>
            <Slider {...settings} className="quickAccessSlider">
                <div className="quickAccessCol">
                    <div className="quickAccessCard purpleCard">
                        <div className="qAHead"><h4>Inbox</h4></div>
                        <div className="qABody">
                            <p>Tasks waiting for your approval. Please click on take action for more details.</p>
                            <img src={mail} alt="Inbox" />
                        </div>
                    </div>
                </div>
                <div className="quickAccessCol">
                    <div className="quickAccessCard blueCard">
                        <div className="qAHead"><h4>Holidays</h4></div>
                        <div className="qABody">
                            <p>No holidays</p>
                            <img src={holiday} alt="Holiday" />
                        </div>
                    </div>
                </div>
                <div className="quickAccessCol">
                    <div className="quickAccessCard greenCard">
                        <div className="qAHead"><h4>On Leave Today</h4></div>
                        <div className="qABody">
                            <p>Everyone is working today! No one is on leave today.</p>
                            <img src={leave} alt="Leave" />
                        </div>
                    </div>
                </div>
                <div className="quickAccessCol">
                    <div className="quickAccessCard orangeCard">
                        <div className="qAHead"><h4>Working Remotely</h4></div>
                        <div className="qABody">
                            <p>Everyone is at office! No one is working remotely today.</p>
                            <img src={wfh} alt="Work from Home" />
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default QuickAccess;
