import React, { Component } from "react";
import { FaFileDownload } from 'react-icons/fa'; // Import the download icon

class Footer extends Component {
  handleDownload = () => {
    const pdfUrl = "My_CV.pdf"; // Replace with your actual PDF file path
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "alex_cv.pdf"; // Replace with the desired filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  render() {
    if (this.props.sharedBasicInfo) {
      var networks = this.props.sharedBasicInfo.social.map(function (network) {
        return (
            <span key={network.name} className="m-4">
            <a href={network.url} target="_blank" rel="noopener noreferrer">
              <i className={network.class}></i>
            </a>
          </span>
        );
      });
    }


    return (
        <footer>
          <div className="col-md-12">
            <div className=" justify-content-center">
              <div className="social-links">{networks}</div>
              <button onClick={this.handleDownload} className="btn btn-light btn-sm rounded-circle "   style={{
                fontSize: '1.5rem',
                padding: '10px',
                lineHeight: '0'
              }}>
                <FaFileDownload />
              </button>
            </div>
            <div className="copyright py-4 text-center">
              <div className="container">
                <small>
                  Copyright  ©{" "}
                  {this.props.sharedBasicInfo
                      ? this.props.sharedBasicInfo.name
                      : "???"}
                </small>
              </div>
            </div>
          </div>
        </footer>
    );
  }
}

export default Footer;
