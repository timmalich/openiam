package com.malichzhang.openiam.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.malichzhang.openiam.domain.enumeration.Community;

import com.malichzhang.openiam.domain.enumeration.Language;

/**
 * A Accessor.
 */
@Entity
@Table(name = "accessor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "accessor")
public class Accessor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "community", nullable = false)
    private Community community;

    @Enumerated(EnumType.STRING)
    @Column(name = "language")
    private Language language;

    @Column(name = "blocked")
    private Boolean blocked;

    @OneToMany(mappedBy = "accessor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Country> countries = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "accessor_entitlement",
               joinColumns = @JoinColumn(name = "accessor_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "entitlement_id", referencedColumnName = "id"))
    private Set<Entitlement> entitlements = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "accessor_organization",
               joinColumns = @JoinColumn(name = "accessor_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "organization_id", referencedColumnName = "id"))
    private Set<Organization> organizations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Accessor title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFirstName() {
        return firstName;
    }

    public Accessor firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Accessor lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public Accessor email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Accessor phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Community getCommunity() {
        return community;
    }

    public Accessor community(Community community) {
        this.community = community;
        return this;
    }

    public void setCommunity(Community community) {
        this.community = community;
    }

    public Language getLanguage() {
        return language;
    }

    public Accessor language(Language language) {
        this.language = language;
        return this;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Boolean isBlocked() {
        return blocked;
    }

    public Accessor blocked(Boolean blocked) {
        this.blocked = blocked;
        return this;
    }

    public void setBlocked(Boolean blocked) {
        this.blocked = blocked;
    }

    public Set<Country> getCountries() {
        return countries;
    }

    public Accessor countries(Set<Country> countries) {
        this.countries = countries;
        return this;
    }

    public Accessor addCountry(Country country) {
        this.countries.add(country);
        country.setAccessor(this);
        return this;
    }

    public Accessor removeCountry(Country country) {
        this.countries.remove(country);
        country.setAccessor(null);
        return this;
    }

    public void setCountries(Set<Country> countries) {
        this.countries = countries;
    }

    public Set<Entitlement> getEntitlements() {
        return entitlements;
    }

    public Accessor entitlements(Set<Entitlement> entitlements) {
        this.entitlements = entitlements;
        return this;
    }

    public Accessor addEntitlement(Entitlement entitlement) {
        this.entitlements.add(entitlement);
        entitlement.getAccessors().add(this);
        return this;
    }

    public Accessor removeEntitlement(Entitlement entitlement) {
        this.entitlements.remove(entitlement);
        entitlement.getAccessors().remove(this);
        return this;
    }

    public void setEntitlements(Set<Entitlement> entitlements) {
        this.entitlements = entitlements;
    }

    public Set<Organization> getOrganizations() {
        return organizations;
    }

    public Accessor organizations(Set<Organization> organizations) {
        this.organizations = organizations;
        return this;
    }

    public Accessor addOrganization(Organization organization) {
        this.organizations.add(organization);
        organization.getAccessors().add(this);
        return this;
    }

    public Accessor removeOrganization(Organization organization) {
        this.organizations.remove(organization);
        organization.getAccessors().remove(this);
        return this;
    }

    public void setOrganizations(Set<Organization> organizations) {
        this.organizations = organizations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Accessor)) {
            return false;
        }
        return id != null && id.equals(((Accessor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Accessor{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", community='" + getCommunity() + "'" +
            ", language='" + getLanguage() + "'" +
            ", blocked='" + isBlocked() + "'" +
            "}";
    }
}
