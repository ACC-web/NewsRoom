import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const H2 = styled.div`
  font-size: 1.8rem;
    line-height: 1.15;
    margin: .5rem 0 .5rem;
    font-weight: 400;
`

class AccordionSection extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Object).isRequired,
        isOpen: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    onClick = () => {
        this.props.onClick(this.props.label);
    };

    render() {
        const {
            onClick,
            props: { isOpen, label },
        } = this;

        return (
            <div
                style={{
                    background: isOpen ? 'rgb(213,213,213)' : 'rgb(213,213,213)',
                    padding: '0.5rem 1rem 0.5rem 1rem',
                    borderRadius: '5px',
                    marginBottom: '1rem'
                }}
            >
                <H2 onClick={onClick} style={{ cursor: 'pointer' }}>
                    {label}
                    <div style={{ float: 'right' }}>
                        {!isOpen && <span>&#x2b;</span>}
                        {isOpen && <span>&#x2212;</span>}
                    </div>
                </H2>
                {isOpen && (
                    <div
                        style={{
                            background: 'transparent',
                            marginTop: 10,
                        }}
                    >
                        {this.props.children}
                    </div>
                )}
            </div>
        );
    }
}

export default AccordionSection;
