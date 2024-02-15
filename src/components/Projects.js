import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deps: {},
            detailsModalShow: false,
        };
    }

    render() {
        let detailsModalShow = (data) => {
            this.setState({ detailsModalShow: true, deps: data });
        };

        let detailsModalClose = () => this.setState({ detailsModalShow: false });

        let projects = [];
        if (this.props.resumeProjects && this.props.resumeBasicInfo) {
            var sectionName = this.props.resumeBasicInfo.section_name.projects;
            projects = this.props.resumeProjects.map((project, index) => (
                <div
                    className="portfolio-item d-inline-block mx-5"
                    key={project.title}
                    style={{
                        cursor: "pointer",
                        flex: "0 0 auto",
                        // marginLeft: "80%", // Add left margin
                        // marginRight: "80%"  // Add right margin
                         }}
                    onClick={() => detailsModalShow(project)}
                >
                    <div className="foto">
                        <img
                            src={project.images[0]}
                            alt="projectImages"
                            style={{
                                marginBottom: 0,
                                paddingBottom: 0,
                                position: "relative",
                                borderRadius: "8px",
                                maxWidth: "100%",
                                maxHeight: "500px",
                                height: "auto",
                            }}
                        />
                        <span className="project-date">{project.startDate}</span>
                        <br />
                        <p className="project-title-settings mt-3">{project.title}</p>
                    </div>
                </div>
            ));
        }

        return (
            <section id="portfolio">
                <div className="col-md-12">
                    <h1 className="section-title" style={{ color: "black" }}>
                        <span>{sectionName}</span>
                    </h1>
                    <div className="col-md-12 mx-auto">
                        <div
                            className="d-flex mx-auto"
                            style={{
                                overflowX: "auto",
                                scrollBehavior: "smooth",
                            }}
                        >
                            {/* Render the projects horizontally */}
                            {projects}
                        </div>
                    </div>
                    <ProjectDetailsModal
                        show={this.state.detailsModalShow}
                        onHide={detailsModalClose}
                        data={this.state.deps}
                    />
                </div>
            </section>
        );
    }
}

export default Projects;
