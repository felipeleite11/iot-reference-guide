import { useEffect, useState } from 'react'
import { IoChevronDown, IoChevronUp, IoGridOutline, IoList } from 'react-icons/io5'
import { GlassMagnifier } from 'react-image-magnifiers'

import './styles.scss'

import { data } from '../../data'

import { Card } from '../../components/Card'

export function Shields() {
	const [gridCols, setGridCols] = useState<string>('3')
	
	useEffect(() => {
		const colsDefault = '3'
		const columns = localStorage.getItem('iot-reference-guide-grid-cols')

		if(!columns) {
			localStorage.setItem('iot-reference-guide-grid-cols', colsDefault)

			setGridCols(colsDefault)
		}

		setGridCols(columns ? columns : colsDefault)
	}, [])

	function alternateGridCols() {
		const currrentColumns = localStorage.getItem('iot-reference-guide-grid-cols')

		const newColumns = currrentColumns === '3' ? '5' : '3'

		localStorage.setItem('iot-reference-guide-grid-cols', newColumns)

		setGridCols(newColumns)
	}

	function setGridColsToList() {
		localStorage.setItem('iot-reference-guide-grid-cols', '1')

		setGridCols('1')
	}

	if(gridCols === '1') {
		return (
			<div className={`shield shields-col-${gridCols}`}>
				<aside>
					<h1>Placas</h1>
					
					<div className="options">
						<IoGridOutline size={24} onClick={alternateGridCols} />

						<IoList size={24} onClick={setGridColsToList} />
					</div>
				</aside>

				<div className="grid">
					<div className="col">
						{data.slice(0, Math.round(data.length / 2)).map((item, i) => (
							<details key={item.id} className={`animated fadeInUp fast delay-${i * 100}ms`}>
								<summary>
									<img src={item.image} />

									{item.title}
								</summary>

								<div className="content">
									<GlassMagnifier
										imageSrc={item.image}
										imageAlt=""
										largeImageSrc={item.image}
										magnifierSize="50%"
										square
									/>

									<table>
										{Object.entries(item.specifications).map(([item, value]) => (
											<tr key={item}>
												<td>{item}</td>
												<td>{value}</td>
											</tr>
										))}
									</table>

									<p>{item.text}</p>

									{item.links ? (
										<div className="links-container">
											<h2>Links úteis</h2>

											<ul>
												{item.links.map(link => (
													<li key={link.url}>
														<a href={link.url} target="_blank" key={link.url}>{link.label}</a>
													</li>
												))}
											</ul>
										</div>
									) : null}
								</div>
							</details>
						))}
					</div>

					<div className="col">
						{data.slice(Math.round(data.length / 2), data.length).map((item, i) => (
							<details key={item.id} className={`animated fadeInUp fast delay-${i * 100}ms`}>
								<summary>
									<img src={item.image} />

									{item.title}
								</summary>

								<div className="content">
									<GlassMagnifier
										imageSrc={item.image}
										imageAlt=""
										largeImageSrc={item.image}
										magnifierSize="50%"
										square
									/>

									<table>
										{Object.entries(item.specifications).map(([item, value]) => (
											<tr key={item}>
												<td>{item}</td>
												<td>{value}</td>
											</tr>
										))}
									</table>

									<p>{item.text}</p>

									{item.links ? (
										<div className="links-container">
											<h2>Links úteis</h2>

											<ul>
												{item.links.map(link => (
													<li key={link.url}>
														<a href={link.url} target="_blank">{link.label}</a>
													</li>
												))}
											</ul>
										</div>
									) : null}
								</div>
							</details>
						))}
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={`shield shields-col-${gridCols}`}>
			<aside>
				<h1>Placas</h1>
				
				<div className="options">
					<IoGridOutline size={24} onClick={alternateGridCols} />

					<IoList size={24} onClick={setGridColsToList} />
				</div>
			</aside>

			{data.map((item, i) => (
				<Card 
					title={item.title} 
					key={item.id} 
					className={`animated fadeInUp fast delay-${i * 100}ms`} 
					direction={gridCols === '1' ? 'horizontal' : 'vertical'}
				>
					<GlassMagnifier
						imageSrc={item.image}
						imageAlt=""
						largeImageSrc={item.image}
						magnifierSize="70%"
						square
					/>

					{/* <ul>
						{item.images.map((img) => (
							<li key={img}>
								<img src={img} />
							</li>
						))}
					</ul> */}

					<details>
						<summary>
							Especificações
							<IoChevronDown size={18} className="down" />
							<IoChevronUp size={18} className="up" />
						</summary>

						<div className="content">
							<table>
								{Object.entries(item.specifications).map(([item, value]) => (
									<tr key={item}>
										<td>{item}</td>
										<td>{value}</td>
									</tr>
								))}
							</table>

							<p>{item.text}</p>
						</div>
					</details>
				</Card>
			))}
		</div>
	)
}
